import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import useRoundDetails from '../../hooks/useRoundDetails';
import useSolvedQuestions from '../../hooks/useSolvedQuestions';
import Loader from '@/components/common/Loader';
import { Link } from 'react-router-dom';
import Timer from '../../components/participant/TimerParticipant';
import QuestionCard from '@/components/participant/QuestionCard';
import LeaderboardModal from '@/components/participant/LeaderboardModal';
import { getSocket } from '@/services/socket';
import { useAuth } from '@/context/useAuth';

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

export default function QuestionsPage() {
  const { roundId } = useParams();
  const navigate = useNavigate();
  const [filter, _setFilter] = useState('ALL');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const socket = getSocket();
  const { user } = useAuth();

  // Fetch solved questions for the current user
  const { solvedQuestionIds, refetch: _refetchSolvedQuestions } = useSolvedQuestions(
    user?.userId || user?.id
  );

  // Debug: log socket connection state and lifecycle events
  useEffect(() => {
    if (!socket) {
      console.warn('[QuestionsPage] socket is null');
      return;
    }

    console.log('[QuestionsPage] socket initial state', {
      connected: socket.connected,
      id: socket.id,
    });

    const onConnect = () => console.log('[QuestionsPage] socket connected', { id: socket.id });
    const onConnectError = (err) => console.error('[QuestionsPage] socket connect_error', err);
    const onDisconnect = (reason) => console.log('[QuestionsPage] socket disconnected', reason);

    socket.on('connect', onConnect);
    socket.on('connect_error', onConnectError);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('connect_error', onConnectError);
      socket.off('disconnect', onDisconnect);
    };
  }, [socket]);
  // useRoundDetails to fetch questions & leaderboard for the selected round
  const {
    roundInfo: roundInfo,
    questions: fetchedQuestions,
    loading: questionsLoading,
    error: questionsError,
    leaderboard: fetchedLeaderboard,
    refetch: refetchRoundDetails,
  } = useRoundDetails(roundId);

  const { status, startAt, endAt } = roundInfo || {};
  const leaderboard = fetchedLeaderboard || [];

  // Join the global competition room to receive live round updates
  useEffect(() => {
    if (!socket) return;
    socket.emit('join', 'competition_overall');
    return () => {
      socket.emit('leave', 'competition_overall');
    };
  }, [socket]);

  // Listen for round status changes and directly update the UI
  useEffect(() => {
    if (!socket) return;
    const handler = (updatedRound) => {
      console.log('[QuestionsPage] round_updated event received:', updatedRound);
      if (!updatedRound) return;
      // only react to updates for our round
      if (String(updatedRound.id) !== String(roundId)) {
        console.log('[QuestionsPage] not our round, ignoring');
        return;
      }
      console.log('[QuestionsPage] updating roundInfo status:', updatedRound.status);
      // Directly update roundInfo with the new status (faster than refetching)
      // This mirrors the pattern used in BattleRoundsPage for immediate UI updates
      // Store it temporarily to force a re-render after state batch updates
      refetchRoundDetails();
    };

    socket.on('round_updated', handler);
    return () => {
      socket.off('round_updated', handler);
    };
  }, [socket, roundId, refetchRoundDetails]);

  const handleQuestionClick = (question) => {
    if (question.status !== 'LOCKED') {
      // include roundId so detail page can navigate back
      navigate(`/question/${question.id}`, { state: { roundId } });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'LOCKED':
        return '#7a3f2a';
      case 'UNLOCKED':
        return '#4ade80';
      case 'ATTEMPTED':
        return '#ff7a00';
      case 'COMPLETED':
        return '#3b82f6';
      default:
        return '#7a3f2a';
    }
  };

  const getRankColor = (rank) => {
    if (rank === 1) return '#fbbf24';
    if (rank === 2) return '#c0c0c0';
    if (rank === 3) return '#cd7f32';
    return '#ff7a00';
  };

  const questions = fetchedQuestions || [];
  const filteredQuestions =
    filter === 'ALL' ? questions : questions.filter((q) => q.difficulty === filter);

  // navigate automatically when round completes
  useEffect(() => {
    if (roundInfo?.status === 'COMPLETED') {
      navigate('/battleRounds');
    }
  }, [roundInfo?.status, navigate]);

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
      <div className="question-page__back-link">
        <Link to={'/battleRounds'} className="brand">
          ← Back
        </Link>
      </div>

      {/* Timer */}

      <Timer roundId={roundId} startAt={startAt} endAt={endAt} />

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-block mb-4">
          <div className="relative">
            <div
              className="absolute inset-0 blur-xl opacity-50 animate-pulse"
              style={{ background: '#ff7a00' }}
            ></div>
          </div>
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(90deg, #ff7a00, #ff9933, #ff7a00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(255, 122, 0, 0.5)',
            letterSpacing: '0.05em',
          }}
        >
          CODE CHALLENGES
        </h1>
        <p
          className="text-base md:text-lg uppercase tracking-wider mb-2"
          style={{
            color: '#ff7a00',
            fontFamily: "'Fira Code', monospace",
            textShadow: '0 0 12px rgba(255, 122, 0, 0.45)',
          }}
        >
          Select Your Challenge
        </p>
        {questionsLoading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : questionsError ? (
          <p className="text-red-400">{questionsError}</p>
        ) : (
          <p className="text-sm" style={{ color: '#b0a7a2', fontFamily: "'Fira Code', monospace" }}>
            {filteredQuestions.length} challenges available
          </p>
        )}
      </div>

      {/* Leaderboard Toggle Button */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-center relative z-10">
        <button
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          className="px-6 py-3 rounded-lg font-bold uppercase transition-all duration-300 flex items-center gap-2"
          style={{
            background: showLeaderboard ? 'rgba(255, 122, 0, 0.2)' : 'rgba(0, 0, 0, 0.4)',
            border: showLeaderboard ? '2px solid #ff7a00' : '2px solid rgba(255, 122, 0, 0.2)',
            color: showLeaderboard ? '#ff7a00' : '#b0a7a2',
            fontFamily: "'Fira Code', monospace",
            backdropFilter: 'blur(10px)',
            boxShadow: showLeaderboard ? '0 0 20px rgba(255, 122, 0, 0.3)' : 'none',
          }}
        >
          <Trophy className="w-5 h-5" />
          {showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard'}
        </button>
      </div>

      {/* Leaderboard Modal */}
      <LeaderboardModal
        open={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        leaderboard={leaderboard}
        getRankColor={getRankColor}
      />

      {/* Questions Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
        {questionsLoading ? (
          <div className="col-span-3 flex justify-center items-center p-8">
            <Loader />
          </div>
        ) : questionsError ? (
          <div className="col-span-3 text-center p-8 text-red-400">{questionsError}</div>
        ) : questions.length === 0 ? (
          <div className="col-span-3 text-center p-8">
            <p
              className="text-lg"
              style={{ color: '#7a3f2a', fontFamily: "'Fira Code', monospace" }}
            >
              No data available yet
            </p>
          </div>
        ) : (
          filteredQuestions.map((question) => {
            const isClickable = status === 'ACTIVE';
            const isSolved = solvedQuestionIds.includes(question.id);
            return (
              <QuestionCard
                key={question.id}
                question={question}
                isClickable={isClickable}
                onClick={handleQuestionClick}
                getStatusColor={getStatusColor}
                isSolved={isSolved}
              />
            );
          })
        )}
      </div>

      {/* Empty state */}
      {!questionsLoading && !questionsError && filteredQuestions.length === 0 && (
        <div className="text-center mt-12 relative z-10">
          <p className="text-lg" style={{ color: '#7a3f2a', fontFamily: "'Fira Code', monospace" }}>
            No challenges found for this filter.
          </p>
        </div>
      )}

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
          Complete challenges to earn points and unlock harder levels
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
      `}</style>
    </div>
  );
}
