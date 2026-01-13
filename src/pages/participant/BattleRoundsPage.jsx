import React from 'react';
import { Swords, Flame, Skull } from 'lucide-react';

const rounds = [
  {
    id: 1,
    title: 'ROUND 01',
    subtitle: 'THE FIRST STRIKE',
    tagline: 'Basic combat protocols - Prove your worth',
    difficulty: 'ENTRY LEVEL',
    status: 'ACTIVE',
    icon: 'flame',
  },
  {
    id: 2,
    title: 'ROUND 02',
    subtitle: 'ESCALATION',
    tagline: 'Advanced warfare tactics - Only the skilled survive',
    difficulty: 'ADVANCED',
    status: 'LOCKED',
    icon: 'swords',
  },
  {
    id: 3,
    title: 'ROUND 03',
    subtitle: 'FINAL JUDGMENT',
    tagline: 'Ultimate showdown - Where legends are forged',
    difficulty: 'EXTREME',
    status: 'LOCKED',
    icon: 'skull',
  },
];

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
  // Handle round click
  const handleRoundClick = (round) => {
    if (round.status === 'ACTIVE') {
      console.log(`Navigating to round ${round.id}`);
      // navigate(`/question/${round.id}`) can go here
    }
  };

  // Difficulty color mapping
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

  // Icon mapping
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'flame':
        return <Flame className="w-12 h-12" />;
      case 'swords':
        return <Swords className="w-12 h-12" />;
      case 'skull':
        return <Skull className="w-12 h-12" />;
      default:
        return <Swords className="w-12 h-12" />;
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
            <Swords
              className="w-16 h-16 mx-auto relative animate-pulse"
              style={{
                color: '#ff7a00',
                filter: 'drop-shadow(0 0 20px rgba(255, 122, 0, 0.8))',
                animationDuration: '2s',
              }}
            />
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
          Three rounds. One champion. Fix the code. Save reality.
        </p>
      </div>

      {/* Rounds Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {rounds.map((round, index) => (
          <div
            key={round.id}
            className="relative group cursor-pointer"
            style={{
              opacity: round.status === 'LOCKED' ? 0.6 : 1,
              pointerEvents: round.status === 'LOCKED' ? 'none' : 'auto',
            }}
            onClick={() => handleRoundClick(round)}
          >
            {/* Glow effect */}
            <div
              className="absolute -inset-1 rounded-xl opacity-30 group-hover:opacity-50 blur-lg transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${getDifficultyColor(
                  round.difficulty
                )}, #ff7a00)`,
                animationDuration: `${3 + index}s`,
              }}
            ></div>

            {/* Card */}
            <div
              className="relative backdrop-blur-xl rounded-xl overflow-hidden border-2 transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl"
              style={{
                background: 'linear-gradient(180deg, rgba(122, 63, 42, 0.12), rgba(0, 0, 0, 0.4))',
                borderColor: round.status === 'LOCKED' ? 'rgba(255, 122, 0, 0.2)' : '#ff7a00',
                boxShadow: `0 0 30px ${
                  round.status === 'LOCKED' ? 'rgba(255, 122, 0, 0.2)' : 'rgba(255, 122, 0, 0.35)'
                }`,
              }}
            >
              {/* Corner brackets */}
              {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map(
                (pos, i) => (
                  <div
                    key={i}
                    className={`absolute ${pos.replace(' ', ' ')} w-8 h-8 border-t-2 border-l-2`}
                    style={{ borderColor: getDifficultyColor(round.difficulty) }}
                  />
                )
              )}

              {/* Status badge */}
              {round.status === 'LOCKED' && (
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase z-10"
                  style={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: '#7a3f2a',
                    border: '1px solid rgba(122, 63, 42, 0.5)',
                    fontFamily: "'Fira Code', monospace",
                  }}
                >
                  🔒 LOCKED
                </div>
              )}

              {/* Icon section */}
              <div
                className="relative p-8 flex flex-col items-center justify-center border-b"
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 122, 0, 0.05), transparent)',
                  borderColor: 'rgba(255, 122, 0, 0.2)',
                  minHeight: '200px',
                }}
              >
                <div className="relative mb-4">
                  <div
                    className="absolute inset-0 blur-lg opacity-50 animate-pulse"
                    style={{
                      background: getDifficultyColor(round.difficulty),
                      animationDuration: '2s',
                    }}
                  ></div>
                  <div
                    className="relative"
                    style={{
                      color: getDifficultyColor(round.difficulty),
                      filter: `drop-shadow(0 0 15px ${getDifficultyColor(round.difficulty)})`,
                    }}
                  >
                    {getIcon(round.icon)}
                  </div>
                </div>

                <h2
                  className="text-3xl font-bold mb-1"
                  style={{
                    color: '#ff7a00',
                    fontFamily: "'Orbitron', sans-serif",
                    textShadow: '0 0 10px rgba(255, 122, 0, 0.5)',
                  }}
                >
                  {round.title}
                </h2>
                <p
                  className="text-sm uppercase tracking-widest"
                  style={{
                    color: getDifficultyColor(round.difficulty),
                    fontFamily: "'Fira Code', monospace",
                    fontWeight: 'bold',
                  }}
                >
                  {round.subtitle}
                </p>
              </div>

              {/* Content section */}
              <div className="p-6">
                <p
                  className="text-sm mb-4 leading-relaxed"
                  style={{ color: '#b0a7a2', fontFamily: "'Fira Code', monospace" }}
                >
                  {round.tagline}
                </p>

                {/* Difficulty indicator */}
                <div
                  className="flex items-center justify-between pt-4 border-t"
                  style={{ borderColor: 'rgba(255, 122, 0, 0.2)' }}
                >
                  <span
                    className="text-xs uppercase"
                    style={{ color: '#7a3f2a', fontFamily: "'Fira Code', monospace" }}
                  >
                    Difficulty
                  </span>
                  <span
                    className="text-xs font-bold uppercase px-3 py-1 rounded"
                    style={{
                      color: getDifficultyColor(round.difficulty),
                      background: `${getDifficultyColor(round.difficulty)}15`,
                      border: `1px solid ${getDifficultyColor(round.difficulty)}50`,
                      fontFamily: "'Fira Code', monospace",
                    }}
                  >
                    {round.difficulty}
                  </span>
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
        ))}
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
