import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Code,
  ChevronRight,
  Lock,
  CheckCircle,
  AlertCircle,
  Trophy,
  Medal,
  X,
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import useRoundDetails from '../../hooks/useRoundDetails';
import Loader from '@/components/common/Loader';
import { Link } from 'react-router-dom';

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

const dummyQuestions = [
  {
    id: '1',
    title: 'Fix the Infinite Loop in React useEffect',
    points: 10,
    status: 'UNLOCKED',
    attempts: 0,
  },
  {
    id: '2',
    title: 'Resolve Memory Leak in Event Listeners',
    points: 20,
    status: 'UNLOCKED',
    attempts: 1,
  },
  {
    id: '3',
    title: 'Debug Async/Await Promise Chain',
    points: 20,
    status: 'ATTEMPTED',
    attempts: 2,
  },
];

const dummyLeaderboard = [
  {
    id: 1,
    rank: 1,
    userId: 101,
    userName: 'CodeMaster',
    score: 850,
    timePenalty: 120,
    submissions: [
      {
        questionId: '1',
        questionTitle: 'Fix the Infinite Loop in React useEffect',
        isCorrect: true,
        timeSubmitted: '00:05:32',
      },
      {
        questionId: '2',
        questionTitle: 'Resolve Memory Leak in Event Listeners',
        isCorrect: true,
        timeSubmitted: '00:12:15',
      },
      {
        questionId: '3',
        questionTitle: 'Debug Async/Await Promise Chain',
        isCorrect: true,
        timeSubmitted: '00:18:45',
      },
    ],
  },
  {
    id: 2,
    rank: 2,
    userId: 102,
    userName: 'DebugNinja',
    score: 720,
    timePenalty: 180,
    submissions: [
      {
        questionId: '1',
        questionTitle: 'Fix the Infinite Loop in React useEffect',
        isCorrect: true,
        timeSubmitted: '00:07:20',
      },
      {
        questionId: '2',
        questionTitle: 'Resolve Memory Leak in Event Listeners',
        isCorrect: true,
        timeSubmitted: '00:15:40',
      },
      {
        questionId: '3',
        questionTitle: 'Debug Async/Await Promise Chain',
        isCorrect: false,
        timeSubmitted: '00:22:10',
      },
    ],
  },
  {
    id: 3,
    rank: 3,
    userId: 103,
    userName: 'ByteWarrior',
    score: 680,
    timePenalty: 150,
    submissions: [
      {
        questionId: '1',
        questionTitle: 'Fix the Infinite Loop in React useEffect',
        isCorrect: true,
        timeSubmitted: '00:06:45',
      },
      {
        questionId: '2',
        questionTitle: 'Resolve Memory Leak in Event Listeners',
        isCorrect: false,
        timeSubmitted: '00:14:30',
      },
      {
        questionId: '3',
        questionTitle: 'Debug Async/Await Promise Chain',
        isCorrect: true,
        timeSubmitted: '00:20:15',
      },
    ],
  },
  {
    id: 4,
    rank: 4,
    userId: 104,
    userName: 'SyntaxSlayer',
    score: 620,
    timePenalty: 200,
    submissions: [
      {
        questionId: '1',
        questionTitle: 'Fix the Infinite Loop in React useEffect',
        isCorrect: true,
        timeSubmitted: '00:08:10',
      },
      {
        questionId: '2',
        questionTitle: 'Resolve Memory Leak in Event Listeners',
        isCorrect: true,
        timeSubmitted: '00:16:25',
      },
    ],
  },
  {
    id: 5,
    rank: 5,
    userId: 105,
    userName: 'LogicLegend',
    score: 590,
    timePenalty: 220,
    submissions: [
      {
        questionId: '1',
        questionTitle: 'Fix the Infinite Loop in React useEffect',
        isCorrect: false,
        timeSubmitted: '00:09:30',
      },
      {
        questionId: '2',
        questionTitle: 'Resolve Memory Leak in Event Listeners',
        isCorrect: true,
        timeSubmitted: '00:17:50',
      },
      {
        questionId: '3',
        questionTitle: 'Debug Async/Await Promise Chain',
        isCorrect: true,
        timeSubmitted: '00:25:20',
      },
    ],
  },
  {
    id: 6,
    rank: 6,
    userId: 106,
    userName: 'AlgoAce',
    score: 550,
    timePenalty: 240,
    submissions: [
      {
        questionId: '1',
        questionTitle: 'Fix the Infinite Loop in React useEffect',
        isCorrect: true,
        timeSubmitted: '00:10:15',
      },
      {
        questionId: '3',
        questionTitle: 'Debug Async/Await Promise Chain',
        isCorrect: false,
        timeSubmitted: '00:23:45',
      },
    ],
  },
  {
    id: 7,
    rank: 7,
    userId: 107,
    userName: 'ReactRanger',
    score: 520,
    timePenalty: 260,
    submissions: [
      {
        questionId: '1',
        questionTitle: 'Fix the Infinite Loop in React useEffect',
        isCorrect: true,
        timeSubmitted: '00:11:20',
      },
      {
        questionId: '2',
        questionTitle: 'Resolve Memory Leak in Event Listeners',
        isCorrect: false,
        timeSubmitted: '00:19:30',
      },
    ],
  },
  {
    id: 8,
    rank: 8,
    userId: 108,
    userName: 'StackMaster',
    score: 480,
    timePenalty: 280,
    submissions: [
      {
        questionId: '1',
        questionTitle: 'Fix the Infinite Loop in React useEffect',
        isCorrect: false,
        timeSubmitted: '00:12:40',
      },
      {
        questionId: '2',
        questionTitle: 'Resolve Memory Leak in Event Listeners',
        isCorrect: true,
        timeSubmitted: '00:20:15',
      },
    ],
  },
];

export default function QuestionsPage() {
  const { roundId } = useParams();
  const navigate = useNavigate();
  const [filter, _setFilter] = useState('ALL');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCards, setExpandedCards] = useState({});

  // useRoundDetails to fetch questions & leaderboard for the selected round
  const {
    questions: fetchedQuestions,
    loading: questionsLoading,
    error: questionsError,
    leaderboard: fetchedLeaderboard,
  } = useRoundDetails(roundId);

  const leaderboard =
    fetchedLeaderboard && fetchedLeaderboard.length > 0 ? fetchedLeaderboard : dummyLeaderboard;

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const toggleCard = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredLeaderboard = leaderboard.filter((entry) =>
    (entry.teamName || entry.userName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  // internal helper - not currently used in layout
  const _getStatusIcon = (status) => {
    switch (status) {
      case 'LOCKED':
        return <Lock className="w-4 h-4" />;
      case 'UNLOCKED':
        return <Code className="w-4 h-4" />;
      case 'ATTEMPTED':
        return <AlertCircle className="w-4 h-4" />;
      case 'COMPLETED':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  const questions = fetchedQuestions && fetchedQuestions.length ? fetchedQuestions : dummyQuestions;
  const filteredQuestions =
    filter === 'ALL' ? questions : questions.filter((q) => q.difficulty === filter);

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
      <div className="max-w-6xl mx-auto mb-4 flex justify-end relative z-10">
        <div
          className="px-6 py-3 rounded-lg backdrop-blur-xl border-2"
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            borderColor: 'rgba(255, 122, 0, 0.3)',
            boxShadow: '0 0 20px rgba(255, 122, 0, 0.2)',
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="text-xs uppercase tracking-wider"
              style={{
                color: '#b0a7a2',
                fontFamily: "'Fira Code', monospace",
              }}
            >
              Time Elapsed
            </span>
            <span
              className="text-2xl font-bold"
              style={{
                color: '#ff7a00',
                fontFamily: "'Orbitron', monospace",
                textShadow: '0 0 10px rgba(255, 122, 0, 0.5)',
              }}
            >
              {formatTime(elapsedTime)}
            </span>
          </div>
        </div>
      </div>

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
      {showLeaderboard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(5px)',
          }}
          onClick={() => setShowLeaderboard(false)}
        >
          <div
            className="w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-lg border-2 relative"
            style={{
              background: 'linear-gradient(180deg, rgba(122, 63, 42, 0.15), rgba(0, 0, 0, 0.95))',
              borderColor: 'rgba(255, 122, 0, 0.4)',
              boxShadow: '0 0 50px rgba(255, 122, 0, 0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="sticky top-0 z-10 p-6 border-b"
              style={{
                background: 'rgba(0, 0, 0, 0.9)',
                borderColor: 'rgba(255, 122, 0, 0.3)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8" style={{ color: '#fbbf24' }} />
                  <h2
                    className="text-3xl font-bold"
                    style={{
                      color: '#ff7a00',
                      fontFamily: "'Orbitron', sans-serif",
                      textShadow: '0 0 20px rgba(255, 122, 0, 0.5)',
                    }}
                  >
                    LEADERBOARD
                  </h2>
                </div>
                <button
                  onClick={() => setShowLeaderboard(false)}
                  className="p-2 rounded-lg transition-all duration-300 hover:bg-opacity-20"
                  style={{
                    background: 'rgba(255, 122, 0, 0.1)',
                    border: '1px solid rgba(255, 122, 0, 0.3)',
                  }}
                >
                  <X className="w-6 h-6" style={{ color: '#ff7a00' }} />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: '#7a3f2a' }}
                />
                <input
                  type="text"
                  placeholder="Search teams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border-2 outline-none transition-all duration-300"
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    borderColor: 'rgba(255, 122, 0, 0.3)',
                    color: '#ff7a00',
                    fontFamily: "'Fira Code', monospace",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ff7a00';
                    e.target.style.boxShadow = '0 0 20px rgba(255, 122, 0, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 122, 0, 0.3)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Results count */}
              <div className="mt-3">
                <span
                  className="text-sm"
                  style={{
                    color: '#b0a7a2',
                    fontFamily: "'Fira Code', monospace",
                  }}
                >
                  {filteredLeaderboard.length} team{filteredLeaderboard.length !== 1 ? 's' : ''}{' '}
                  found
                </span>
              </div>
            </div>

            {/* Scrollable Content */}
            <div
              className="overflow-y-auto p-6 space-y-4"
              style={{ maxHeight: 'calc(90vh - 200px)' }}
            >
              {filteredLeaderboard.length === 0 ? (
                <div
                  className="text-center p-8 rounded-lg"
                  style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderColor: 'rgba(255, 122, 0, 0.2)',
                  }}
                >
                  <p
                    className="text-lg"
                    style={{
                      color: '#7a3f2a',
                      fontFamily: "'Fira Code', monospace",
                    }}
                  >
                    No teams found matching "{searchQuery}"
                  </p>
                </div>
              ) : (
                filteredLeaderboard.map((entry) => {
                  const isExpanded = expandedCards[entry.id];
                  const getRankColor = (rank) => {
                    if (rank === 1) return '#fbbf24';
                    if (rank === 2) return '#c0c0c0';
                    if (rank === 3) return '#cd7f32';
                    return '#ff7a00';
                  };

                  const getRankIcon = (rank) => {
                    if (rank <= 3) {
                      return <Medal className="w-6 h-6" style={{ color: getRankColor(rank) }} />;
                    }
                    return null;
                  };

                  return (
                    <div
                      key={entry.id}
                      className="rounded-lg border-2 overflow-hidden transition-all duration-300"
                      style={{
                        background:
                          entry.rank <= 3
                            ? `linear-gradient(135deg, ${getRankColor(
                                entry.rank
                              )}10, rgba(0, 0, 0, 0.4))`
                            : 'rgba(0, 0, 0, 0.4)',
                        borderColor:
                          entry.rank <= 3
                            ? `${getRankColor(entry.rank)}60`
                            : 'rgba(255, 122, 0, 0.3)',
                        boxShadow:
                          entry.rank <= 3 ? `0 0 20px ${getRankColor(entry.rank)}20` : 'none',
                      }}
                    >
                      {/* Team Header - Clickable */}
                      <div
                        className="p-4 border-b flex items-center justify-between cursor-pointer hover:bg-opacity-80 transition-all duration-300"
                        style={{
                          background:
                            entry.rank <= 3
                              ? `linear-gradient(90deg, ${getRankColor(
                                  entry.rank
                                )}15, rgba(0, 0, 0, 0.5))`
                              : 'rgba(0, 0, 0, 0.5)',
                          borderColor: 'rgba(255, 122, 0, 0.2)',
                        }}
                        onClick={() => toggleCard(entry.id)}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          {/* Rank */}
                          <div className="flex items-center gap-2">
                            <span
                              className="text-3xl font-bold flex items-center gap-2"
                              style={{
                                color: getRankColor(entry.rank),
                                fontFamily: "'Orbitron', monospace",
                              }}
                            >
                              {getRankIcon(entry.rank)}#{entry.rank}
                            </span>
                          </div>

                          {/* Team Name */}
                          <div>
                            <h3
                              className="text-xl font-bold"
                              style={{
                                color: '#ff7a00',
                                fontFamily: "'Fira Code', monospace",
                              }}
                            >
                              {entry.userName}
                            </h3>
                          </div>
                        </div>

                        {/* Stats and Expand Icon */}
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div
                              className="text-xs uppercase"
                              style={{
                                color: '#7a3f2a',
                                fontFamily: "'Fira Code', monospace",
                              }}
                            >
                              Score
                            </div>
                            <div
                              className="text-2xl font-bold"
                              style={{
                                color: '#4ade80',
                                fontFamily: "'Orbitron', monospace",
                              }}
                            >
                              {entry.score}
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className="text-xs uppercase"
                              style={{
                                color: '#7a3f2a',
                                fontFamily: "'Fira Code', monospace",
                              }}
                            >
                              Penalty
                            </div>
                            <div
                              className="text-2xl font-bold"
                              style={{
                                color: '#ef4444',
                                fontFamily: "'Orbitron', monospace",
                              }}
                            >
                              {entry.timePenalty}s
                            </div>
                          </div>

                          {/* Expand/Collapse Icon */}
                          <div className="ml-4">
                            {isExpanded ? (
                              <ChevronUp className="w-6 h-6" style={{ color: '#ff7a00' }} />
                            ) : (
                              <ChevronDown className="w-6 h-6" style={{ color: '#ff7a00' }} />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Submissions - Expandable */}
                      {isExpanded && (
                        <div className="p-4">
                          <div
                            className="text-sm uppercase mb-3 font-semibold"
                            style={{
                              color: '#ff7a00',
                              fontFamily: "'Fira Code', monospace",
                            }}
                          >
                            Submissions ({entry.submissions.length})
                          </div>
                          <div className="space-y-2">
                            {entry.submissions.map((submission, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-lg border flex items-center justify-between"
                                style={{
                                  background: submission.isCorrect
                                    ? 'rgba(74, 222, 128, 0.1)'
                                    : 'rgba(239, 68, 68, 0.1)',
                                  borderColor: submission.isCorrect
                                    ? 'rgba(74, 222, 128, 0.3)'
                                    : 'rgba(239, 68, 68, 0.3)',
                                }}
                              >
                                <div className="flex items-center gap-3 flex-1">
                                  {/* Status Icon */}
                                  {submission.isCorrect ? (
                                    <CheckCircle
                                      className="w-5 h-5 flex-shrink-0"
                                      style={{ color: '#4ade80' }}
                                    />
                                  ) : (
                                    <AlertCircle
                                      className="w-5 h-5 flex-shrink-0"
                                      style={{ color: '#ef4444' }}
                                    />
                                  )}

                                  {/* Question Title */}
                                  <span
                                    className="font-medium"
                                    style={{
                                      color: submission.isCorrect ? '#4ade80' : '#ef4444',
                                      fontFamily: "'Fira Code', monospace",
                                    }}
                                  >
                                    {submission.questionTitle}
                                  </span>
                                </div>

                                {/* Time */}
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" style={{ color: '#b0a7a2' }} />
                                  <span
                                    className="text-sm font-mono"
                                    style={{
                                      color: '#b0a7a2',
                                      fontFamily: "'Fira Code', monospace",
                                    }}
                                  >
                                    {submission.timeSubmitted}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* No submissions message */}
                          {entry.submissions.length === 0 && (
                            <div
                              className="text-center p-4 rounded-lg"
                              style={{
                                background: 'rgba(0, 0, 0, 0.3)',
                                color: '#7a3f2a',
                                fontFamily: "'Fira Code', monospace",
                              }}
                            >
                              No submissions yet
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Questions Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
        {questionsLoading ? (
          <div className="col-span-3 flex justify-center items-center p-8">
            <Loader />
          </div>
        ) : questionsError ? (
          <div className="col-span-3 text-center p-8 text-red-400">{questionsError}</div>
        ) : (
          filteredQuestions.map((question) => {
            const isClickable = question.status !== 'LOCKED';

            return (
              <div
                key={question.id}
                className="relative group cursor-pointer"
                style={{
                  opacity: question.status === 'LOCKED' ? 0.6 : 1,
                  pointerEvents: isClickable ? 'auto' : 'none',
                }}
                onClick={() => handleQuestionClick(question)}
              >
                {/* Glow effect */}
                <div
                  className="absolute -inset-1 rounded-lg opacity-20 group-hover:opacity-40 blur-md transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${getStatusColor(
                      question.status
                    )}, ${getStatusColor(question.status)})`,
                  }}
                ></div>

                {/* Card */}
                <div
                  className="relative backdrop-blur-xl rounded-lg overflow-hidden border-2 transition-all duration-300 transform group-hover:scale-102 group-hover:shadow-xl"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(122, 63, 42, 0.12), rgba(0, 0, 0, 0.4))',
                    borderColor: isClickable
                      ? getStatusColor(question.status)
                      : 'rgba(255, 122, 0, 0.2)',
                    boxShadow: `0 0 20px ${
                      isClickable
                        ? `${getStatusColor(question.status)}35`
                        : 'rgba(255, 122, 0, 0.2)'
                    }`,
                    minHeight: '160px',
                  }}
                >
                  {/* Content */}
                  <div className="p-5 flex flex-col h-full justify-between">
                    <div>
                      {/* Question Title */}
                      <h3
                        className="text-base font-bold mb-3 leading-tight"
                        style={{
                          color: '#ff7a00',
                          fontFamily: "'Fira Code', monospace",
                          textShadow: '0 0 8px rgba(255, 122, 0, 0.3)',
                        }}
                      >
                        {question.title}
                      </h3>
                    </div>

                    {/* Bottom info */}
                    <div
                      className="flex items-center justify-between mt-4 pt-4 border-t"
                      style={{ borderColor: 'rgba(255, 122, 0, 0.2)' }}
                    >
                      <div className="flex items-center gap-3">
                        {question.attempts > 0 && (
                          <div
                            className="text-xs"
                            style={{
                              color: '#7a3f2a',
                              fontFamily: "'Fira Code', monospace",
                            }}
                          >
                            Attempts: {question.attempts}
                          </div>
                        )}
                      </div>

                      {isClickable && (
                        <ChevronRight
                          className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                          style={{ color: '#ff7a00' }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Hover effect */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      border: '1px dashed rgba(255, 122, 0, 0.3)',
                    }}
                  ></div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Empty state */}
      {filteredQuestions.length === 0 && (
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
