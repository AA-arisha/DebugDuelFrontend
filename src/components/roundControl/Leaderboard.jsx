import React from 'react';
import { Badge } from '../ui/Badge';

export default function Leaderboard({ leaderboard }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-1 h-6 bg-gradient-to-b from-yellow-500 to-amber-500 rounded-full"></div>
        <h3 className="text-lg font-semibold">Leaderboard</h3>
        <span className="text-2xl">🏆</span>
      </div>

      <div className="border-2 border-yellow-500/20 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-b-2 border-yellow-500/30">
            <tr>
              <th className="px-6 py-4 text-left font-bold">Rank</th>
              <th className="px-6 py-4 text-left font-bold">Team Name</th>
              <th className="px-6 py-4 text-left font-bold">Score</th>
              <th className="px-6 py-4 text-left font-bold">Time Penalty</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, i) => (
              <tr
                key={entry.rank}
                className={`border-b border-gray-800 hover:bg-yellow-500/5 ${
                  i % 2 === 1 ? 'bg-gray-900/50' : ''
                } ${entry.rank <= 3 ? 'border-l-4 border-yellow-500' : ''}`}
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
                      {entry.rank === 1
                        ? '🥇'
                        : entry.rank === 2
                        ? '🥈'
                        : entry.rank === 3
                        ? '🥉'
                        : '✨'}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-lg bg-gradient-to-r ${
                        entry.rank === 1
                          ? 'from-yellow-500 to-amber-500'
                          : entry.rank === 2
                          ? 'from-gray-300 to-gray-400'
                          : entry.rank === 3
                          ? 'from-orange-400 to-amber-600'
                          : 'from-blue-500 to-purple-500'
                      } text-white font-bold shadow-lg`}
                    >
                      #{entry.rank}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="font-bold text-lg">{entry.teamName}</p>
                </td>
                <td className="px-6 py-5">
                  <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-2 border-green-500/40 px-4 py-1.5 font-bold rounded-lg">
                    🎯 {entry.score} pts
                  </Badge>
                </td>
                <td className="px-6 py-5">
                  <span className="text-orange-400 font-bold font-mono">
                    ⏱️ +{entry.timePenalty}m
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
