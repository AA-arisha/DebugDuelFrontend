import React, { useState } from 'react';
import { X, Search, ChevronDown, ChevronUp, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function LeaderboardModal({ open, onClose, leaderboard = [], getRankColor }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState({});

  if (!open) return null;

  const filtered = leaderboard.filter((entry) =>
    (entry.teamName || entry.userName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour12: false }); // HH:MM:SS
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-lg border-2 relative"
        style={{
          background: 'linear-gradient(180deg, rgba(122,63,42,0.15), rgba(0,0,0,0.95))',
          borderColor: 'rgba(255,122,0,0.4)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 p-6 border-b"
          style={{
            background: 'rgba(0,0,0,0.9)',
            borderColor: 'rgba(255,122,0,0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-3xl font-bold"
              style={{ color: '#ff7a00', fontFamily: "'Orbitron', sans-serif" }}
            >
              LEADERBOARD
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-all duration-300 hover:bg-opacity-20"
              style={{ background: 'rgba(255,122,0,0.1)', border: '1px solid rgba(255,122,0,0.3)' }}
            >
              <X className="w-6 h-6" style={{ color: '#ff7a00' }} />
            </button>
          </div>

          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: '#7a3f2a' }}
            />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search teams..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border-2 outline-none transition-all duration-300"
              style={{
                background: 'rgba(0,0,0,0.5)',
                borderColor: 'rgba(255,122,0,0.3)',
                color: '#ff7a00',
                fontFamily: "'Fira Code', monospace",
              }}
            />
          </div>
        </div>

        {/* Leaderboard entries */}
        <div className="overflow-y-auto p-6 space-y-4" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {filtered.length === 0 ? (
            <div className="text-center p-8 rounded-lg" style={{ background: 'rgba(0,0,0,0.4)' }}>
              <p
                className="text-lg"
                style={{ color: '#7a3f2a', fontFamily: "'Fira Code', monospace" }}
              >
                No teams found matching "{searchQuery}"
              </p>
            </div>
          ) : (
            filtered.map((entry) => {
              const isExpanded = !!expanded[entry.userId];
              const rankColor =
                getRankColor?.(entry.rank) ??
                (entry.rank <= 3 ? ['#fbbf24', '#c0c0c0', '#cd7f32'][entry.rank - 1] : '#ff7a00');

              return (
                <div
                  key={entry.userId}
                  className="rounded-lg border-2 overflow-hidden transition-all duration-300"
                  style={{
                    background:
                      entry.rank <= 3
                        ? `linear-gradient(135deg, ${rankColor}10, rgba(0,0,0,0.4))`
                        : 'rgba(0,0,0,0.4)',
                    borderColor: entry.rank <= 3 ? `${rankColor}60` : 'rgba(255,122,0,0.3)',
                    boxShadow: entry.rank <= 3 ? `0 0 20px ${rankColor}20` : 'none',
                  }}
                >
                  {/* Entry header */}
                  <div
                    className="p-4 border-b flex items-center justify-between cursor-pointer hover:bg-opacity-80 transition-all duration-300"
                    style={{
                      background:
                        entry.rank <= 3
                          ? `linear-gradient(90deg, ${rankColor}15, rgba(0,0,0,0.5))`
                          : 'rgba(0,0,0,0.5)',
                      borderColor: 'rgba(255,122,0,0.2)',
                    }}
                    onClick={() => setExpanded((s) => ({ ...s, [entry.userId]: !s[entry.userId] }))}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span
                        className="text-3xl font-bold"
                        style={{ color: rankColor, fontFamily: "'Orbitron', monospace" }}
                      >
                        #{entry.rank}
                      </span>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: '#ff7a00', fontFamily: "'Fira Code', monospace" }}
                      >
                        {entry.teamName}
                      </h3>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div
                          className="text-xs uppercase"
                          style={{ color: '#7a3f2a', fontFamily: "'Fira Code', monospace" }}
                        >
                          Score
                        </div>
                        <div
                          className="text-2xl font-bold"
                          style={{ color: '#4ade80', fontFamily: "'Orbitron', monospace" }}
                        >
                          {entry.score}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className="text-xs uppercase"
                          style={{ color: '#7a3f2a', fontFamily: "'Fira Code', monospace" }}
                        >
                          Penalty
                        </div>
                        <div
                          className="text-2xl font-bold"
                          style={{ color: '#ef4444', fontFamily: "'Orbitron', monospace" }}
                        >
                          {entry.timePenalty}s
                        </div>
                      </div>

                      <div className="ml-4">
                        {isExpanded ? (
                          <ChevronUp className="w-6 h-6" style={{ color: '#ff7a00' }} />
                        ) : (
                          <ChevronDown className="w-6 h-6" style={{ color: '#ff7a00' }} />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submissions */}
                  {isExpanded && (
                    <div className="p-4">
                      <div
                        className="text-sm uppercase mb-3 font-semibold"
                        style={{ color: '#ff7a00', fontFamily: "'Fira Code', monospace" }}
                      >
                        Submissions ({entry.submissions?.length || 0})
                      </div>

                      <div className="space-y-2">
                        {(entry.submissions || []).map((submission, idx) => {
                          const time = formatTime(submission.timeSubmitted);
                          return (
                            <div
                              key={idx}
                              className="p-3 rounded-lg border flex items-center justify-between"
                              style={{
                                background: submission.correct
                                  ? 'rgba(74,222,128,0.1)'
                                  : 'rgba(239,68,68,0.1)',
                                borderColor: submission.correct
                                  ? 'rgba(74,222,128,0.3)'
                                  : 'rgba(239,68,68,0.3)',
                              }}
                            >
                              <div className="flex items-center gap-3 flex-1">
                                {submission.correct ? (
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
                                <span
                                  className="font-medium"
                                  style={{
                                    color: submission.correct ? '#4ade80' : '#ef4444',
                                    fontFamily: "'Fira Code', monospace",
                                  }}
                                >
                                  {submission.questionTitle}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" style={{ color: '#b0a7a2' }} />
                                <span
                                  className="text-sm font-mono"
                                  style={{ color: '#b0a7a2', fontFamily: "'Fira Code', monospace" }}
                                >
                                  {time}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {(entry.submissions || []).length === 0 && (
                        <div
                          className="text-center p-4 rounded-lg"
                          style={{
                            background: 'rgba(0,0,0,0.3)',
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
  );
}
