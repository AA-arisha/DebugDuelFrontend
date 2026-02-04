import React from 'react';
import { Badge } from '../ui/Badge';

export default function SubmissionsTable({ submissions, onViewSubmission }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
        <h3 className="text-lg font-semibold">Submissions</h3>
        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold border border-blue-500/30">
          {submissions.length} submissions
        </span>
      </div>

      <div className="border-2 border-blue-500/20 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-b-2 border-blue-500/30">
            <tr>
              <th className="px-6 py-4 text-left font-bold">👥 Team</th>
              <th className="px-6 py-4 text-left font-bold">📝 Question</th>
              <th className="px-6 py-4 text-left font-bold">💻 Language</th>
              <th className="px-6 py-4 text-left font-bold">🎯 Score</th>
              <th className="px-6 py-4 text-left font-bold">📊 Status</th>
              <th className="px-6 py-4 text-left font-bold">⚡ Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub, i) => {
              const statusColors = {
                accepted: {
                  bg: 'from-green-500/20 to-emerald-500/20',
                  text: 'text-green-400',
                  border: 'border-green-500/40',
                  icon: '✅',
                },
                pending: {
                  bg: 'from-yellow-500/20 to-amber-500/20',
                  text: 'text-yellow-400',
                  border: 'border-yellow-500/40',
                  icon: '⏳',
                },
                rejected: {
                  bg: 'from-red-500/20 to-pink-500/20',
                  text: 'text-red-400',
                  border: 'border-red-500/40',
                  icon: '❌',
                },
              };
              const sc = statusColors[sub.status];

              return (
                <tr
                  key={sub.id}
                  className={`border-b border-gray-800 hover:bg-blue-500/5 ${
                    i % 2 === 1 ? 'bg-gray-900/50' : ''
                  }`}
                >
                  <td className="px-6 py-5">
                    <p className="font-bold">{sub.teamName}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-medium">{sub.questionTitle}</p>
                  </td>
                  <td className="px-6 py-5">
                    <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-2 border-purple-500/40 px-3 py-1.5 font-bold rounded-lg">
                      {sub.language}
                    </Badge>
                  </td>
                  <td className="px-6 py-5">
                    <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-2 border-green-500/40 px-4 py-1.5 font-bold rounded-lg">
                      {sub.score}/100
                    </Badge>
                  </td>
                  <td className="px-6 py-5">
                    <Badge
                      className={`bg-gradient-to-r ${sc.bg} ${sc.text} border-2 ${sc.border} px-3 py-1.5 font-bold rounded-lg flex items-center gap-1.5 w-fit`}
                    >
                      {sc.icon} {sub.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="px-6 py-5">
                    <button
                      onClick={() => onViewSubmission(sub)}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-2 border-blue-500/40 font-bold hover:from-blue-500/30 hover:to-cyan-500/30 transition-all shadow-lg shadow-blue-500/10"
                    >
                      🔍 View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
