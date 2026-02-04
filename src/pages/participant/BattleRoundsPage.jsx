import React, { useState, useEffect } from 'react';
import { Swords, Flame, Skull, Clock, Lock, CheckCircle, Play } from 'lucide-react';
import { useRounds } from '@/components/rounds/useRounds';
import { useNavigate } from 'react-router-dom';
// Generate particle styles OUTSIDE the component - this runs once when the module loads
const particleStyles = Array.from({ length: 30 }).map(() => ({
  width: `${Math.random() * 3 + 1}px`,
  height: `${Math.random() * 3 + 1}px`,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  background: Math.random() > 0.5 ? '#ff6b35' : '#fbbf24',
  opacity: Math.random() * 0.6 + 0.2,
  animation: `float ${Math.random() * 10 + 5}s linear infinite`,
  animationDelay: `${Math.random() * 5}s`,
}));

export default function BattleRoundsPage() {
  const navigate = useNavigate();
  const { rounds, fetchRounds } = useRounds();
  const [_currentTime, setCurrentTime] = useState(new Date());

  // Fetch rounds on mount
  useEffect(() => {
    fetchRounds();
  }, [fetchRounds]);

  // Update timer every second for active rounds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle round click
  const handleRoundClick = (round) => {
    if (round.status === 'ACTIVE' || round.status === 'UNLOCKED') {
      // Navigate to questions page for that round
      navigate(`/questions/${round.id}`);
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'LOCKED':
        return '#7a3f2a';
      case 'UNLOCKED':
        return '#4ade80';
      case 'ACTIVE':
        return '#ff7a00';
      case 'COMPLETED':
        return '#3b82f6';
      default:
        return '#7a3f2a';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'LOCKED':
        return <Lock className="w-4 h-4" />;
      case 'UNLOCKED':
        return <CheckCircle className="w-4 h-4" />;
      case 'ACTIVE':
        return <Play className="w-4 h-4" />;
      case 'COMPLETED':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Lock className="w-4 h-4" />;
    }
  };

  // Calculate time remaining
  const getTimeRemaining = (endsAt) => {
    if (!endsAt) return null;

    const now = new Date();
    const end = new Date(endsAt);
    const diff = end - now;

    if (diff <= 0) return 'Ended';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  // Get difficulty label based on round number or weight
  const getDifficultyLabel = (roundNumber, weight) => {
    if (weight) {
      if (weight <= 30) return 'ENTRY LEVEL';
      if (weight <= 60) return 'ADVANCED';
      return 'EXTREME';
    }
    // Fallback based on round number
    const labels = ['ENTRY LEVEL', 'ADVANCED', 'EXTREME'];
    return labels[(roundNumber - 1) % labels.length] || 'ADVANCED';
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'ENTRY LEVEL':
        return '#4ade80';
      case 'ADVANCED':
        return '#ff7a00';
      case 'EXTREME':
        return '#ef4444';
      default:
        return '#ff7a00';
    }
  };

  return (
    <div
      className="min-h-screen w-full p-4 md:p-8 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(800px 400px at 8% 10%, rgba(255, 122, 0, 0.08), transparent), linear-gradient(180deg, #050406, #0b0b0d)',
      }}
    >
      {/* Floating ash particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particleStyles.map((style, i) => (
          <div key={i} className="absolute rounded-full opacity-40" style={style} />
        ))}
      </div>

      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          backgroundSize: '100% 3px',
        }}
      ></div>

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <div className="inline-block mb-4">
          <div className="relative">
            <div
              className="absolute inset-0 blur-xl opacity-50 animate-pulse"
              style={{ background: '#ff7a00' }}
            ></div>
          </div>
        </div>
        <h1
          className="text-5xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(90deg, #ff7a00, #ff9933, #ff7a00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(255, 122, 0, 0.5)',
            letterSpacing: '0.05em',
          }}
        >
          DEBUG DUEL
        </h1>
        <p
          className="text-lg md:text-xl uppercase tracking-wider mb-2"
          style={{
            color: '#ff7a00',
            fontFamily: "'Fira Code', monospace",
            textShadow: '0 0 12px rgba(255, 122, 0, 0.45)',
          }}
        >
          Choose Your Battle
        </p>
        <p className="text-sm" style={{ color: '#b0a7a2', fontFamily: "'Fira Code', monospace" }}>
          {rounds.length} rounds. One champion. Fix the code. Save reality.
        </p>
      </div>

      {/* Rounds Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {rounds.map((round, index) => {
          const difficulty = getDifficultyLabel(round.roundNumber, round.weight);
          const _timeRemaining = round.status === 'ACTIVE' ? getTimeRemaining(round.endsAt) : null;
          const isClickable = round.status === 'ACTIVE' || round.status === 'UNLOCKED';

          return (
            <div
              key={round.id}
              className="relative group cursor-pointer"
              style={{
                opacity: round.status === 'LOCKED' ? 0.6 : 1,
                pointerEvents: isClickable ? 'auto' : 'none',
              }}
              onClick={() => handleRoundClick(round)}
            >
              {/* Glow effect */}
              <div
                className="absolute -inset-1 rounded-xl opacity-30 group-hover:opacity-50 blur-lg transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${getDifficultyColor(
                    difficulty
                  )}, ${getStatusColor(round.status)})`,
                  animationDuration: `${3 + index}s`,
                }}
              ></div>

              {/* Card */}
              <div
                className="relative backdrop-blur-xl rounded-xl overflow-hidden border-2 transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl flex flex-col"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(122, 63, 42, 0.12), rgba(0, 0, 0, 0.4))',
                  borderColor: isClickable
                    ? getStatusColor(round.status)
                    : 'rgba(255, 122, 0, 0.2)',
                  boxShadow: `0 0 30px ${
                    isClickable ? `${getStatusColor(round.status)}55` : 'rgba(255, 122, 0, 0.2)'
                  }`,
                  minHeight: '420px',
                  maxHeight: '420px',
                }}
              >
                {/* Corner brackets */}
                {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map(
                  (pos, i) => {
                    const [vertical, horizontal] = pos.split(' ');
                    const isTop = vertical === 'top-2';
                    const isLeft = horizontal === 'left-2';
                    return (
                      <div
                        key={i}
                        className={`absolute ${pos} w-8 h-8`}
                        style={{
                          borderColor: getDifficultyColor(difficulty),
                          borderTopWidth: isTop ? '2px' : '0',
                          borderLeftWidth: isLeft ? '2px' : '0',
                          borderBottomWidth: !isTop ? '2px' : '0',
                          borderRightWidth: !isLeft ? '2px' : '0',
                        }}
                      />
                    );
                  }
                )}

                {/* Status badge */}
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase z-10 flex items-center gap-1"
                  style={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: getStatusColor(round.status),
                    border: `1px solid ${getStatusColor(round.status)}50`,
                    fontFamily: "'Fira Code', monospace",
                  }}
                >
                  {getStatusIcon(round.status)}
                  {round.status}
                </div>

                {/* Timer badge (if active)
                {timeRemaining && round.status === 'ACTIVE' && (
                  <div
                    className="absolute top-4 left-4 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 122, 0, 0.2), rgba(0, 0, 0, 0.9))',
                      color: '#fbbf24',
                      border: '2px solid rgba(251, 191, 36, 0.6)',
                      fontFamily: "'Fira Code', monospace",
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)',
                    }}
                  >
                    <Clock className="w-4 h-4 animate-pulse" />
                    <span>{timeRemaining}</span>
                  </div>
                )} */}

                {/* Icon section */}
                <div
                  className="relative p-8 flex flex-col items-center justify-center border-b flex-shrink-0"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 122, 0, 0.05), transparent)',
                    borderColor: 'rgba(255, 122, 0, 0.2)',
                    height: '220px',
                  }}
                >
                  <div className="relative mb-4">
                    <div
                      className="absolute inset-0 blur-lg opacity-50 animate-pulse"
                      style={{
                        background: getDifficultyColor(difficulty),
                        animationDuration: '2s',
                      }}
                    ></div>
                  </div>

                  <h2
                    className="text-3xl font-bold mb-1"
                    style={{
                      color: '#ff7a00',
                      fontFamily: "'Orbitron', sans-serif",
                      textShadow: '0 0 10px rgba(255, 122, 0, 0.5)',
                    }}
                  >
                    ROUND {String(round.roundNumber).padStart(2, '0')}
                  </h2>
                  <p
                    className="text-sm uppercase tracking-widest"
                    style={{
                      color: getDifficultyColor(difficulty),
                      fontFamily: "'Fira Code', monospace",
                      fontWeight: 'bold',
                    }}
                  >
                    {round.name}
                  </p>
                </div>

                {/* Content section */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" style={{ color: '#b0a7a2' }} />
                        <span
                          className="text-sm"
                          style={{ color: '#b0a7a2', fontFamily: "'Fira Code', monospace" }}
                        >
                          {round.duration} minutes
                        </span>
                      </div>
                      {round.weight && (
                        <span
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            color: '#ff7a00',
                            background: 'rgba(255, 122, 0, 0.1)',
                            border: '1px solid rgba(255, 122, 0, 0.3)',
                            fontFamily: "'Fira Code', monospace",
                          }}
                        >
                          Weight: {round.weight}
                        </span>
                      )}
                    </div>

                    {/* Time information */}
                    <div className="space-y-2 mb-4">
                      {round.startTime && (
                        <div
                          className="flex items-center gap-2 px-3 py-2 rounded-lg"
                          style={{
                            background: 'rgba(74, 222, 128, 0.1)',
                            border: '1px solid rgba(74, 222, 128, 0.3)',
                          }}
                        >
                          <div
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{ background: '#4ade80' }}
                          ></div>
                          <span
                            className="text-xs font-semibold"
                            style={{ color: '#4ade80', fontFamily: "'Fira Code', monospace" }}
                          >
                            Start:{' '}
                            {new Date(round.startTime).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      )}
                      {round.endsAt && (
                        <div
                          className="flex items-center gap-2 px-3 py-2 rounded-lg"
                          style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                          }}
                        >
                          <div
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{ background: '#ef4444' }}
                          ></div>
                          <span
                            className="text-xs font-semibold"
                            style={{ color: '#ef4444', fontFamily: "'Fira Code', monospace" }}
                          >
                            Ends:{' '}
                            {new Date(round.endsAt).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover glitch effect */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    border: '1px dashed rgba(255, 122, 0, 0.3)',
                    animation: 'glitch 0.7s steps(2, end) infinite',
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom info bar */}
      <div
        className="max-w-6xl mx-auto mt-12 p-4 rounded-lg border text-center relative z-10"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          borderColor: 'rgba(255, 122, 0, 0.2)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <p
          className="text-xs uppercase tracking-wide"
          style={{ color: '#7a3f2a', fontFamily: "'Fira Code', monospace" }}
        >
          Complete each round to unlock the next battle phase
        </p>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(5px); }
        }
        @keyframes glitch {
          0% { clip-path: inset(10% 0 80% 0); transform: translateX(-1px); }
          20% { clip-path: inset(40% 0 40% 0); transform: translateX(1px); }
          40% { clip-path: inset(70% 0 10% 0); transform: translateX(-2px); }
          60% { clip-path: inset(30% 0 50% 0); transform: translateX(2px); }
          80% { clip-path: inset(60% 0 20% 0); transform: translateX(-1px); }
          100% { clip-path: inset(10% 0 80% 0); transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
