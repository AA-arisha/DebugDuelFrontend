import React from 'react';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/button';

export default function SubmissionModal({ submission, onClose }) {
  if (!submission) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-blue-500/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl">
              📤
            </div>
            <h2 className="text-2xl font-bold">Submission Details</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-red-500/20 text-red-400 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border-2 border-blue-500/20">
            <p className="text-xs font-bold text-blue-400 mb-2">👥 TEAM</p>
            <p className="text-lg font-bold">{submission.teamName}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border-2 border-purple-500/20">
            <p className="text-xs font-bold text-purple-400 mb-2">📝 QUESTION</p>
            <p className="text-lg font-bold">{submission.questionTitle}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-xl border-2 border-orange-500/20">
            <p className="text-xs font-bold text-orange-400 mb-2">💻 LANGUAGE</p>
            <p className="text-lg font-bold">{submission.language}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border-2 border-green-500/20">
            <p className="text-xs font-bold text-green-400 mb-2">🎯 SCORE</p>
            <Badge className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-400 border-2 border-green-500/50 px-4 py-2 text-lg font-bold rounded-lg">
              {submission.score}/100
            </Badge>
          </div>
        </div>

        {submission.code && (
          <div className="p-5 bg-gray-800/50 rounded-xl border-2 border-gray-700">
            <p className="text-xs font-bold text-gray-400 mb-3">💾 SUBMITTED CODE</p>
            <pre className="bg-gray-950 border-2 border-gray-800 rounded-xl p-4 text-gray-200 text-sm overflow-x-auto font-mono">
              {submission.code}
            </pre>
          </div>
        )}

        <Button
          onClick={onClose}
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-6 font-bold rounded-lg shadow-lg"
        >
          ✅ Close
        </Button>
      </div>
    </div>
  );
}
