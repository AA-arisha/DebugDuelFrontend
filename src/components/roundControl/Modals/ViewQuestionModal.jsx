import React from 'react';
import { Button } from '../../ui/button';

export default function ViewQuestionModal({ question, onClose }) {
  if (!question) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-blue-500/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">{question.title}</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-red-500/20 text-red-400 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h3 className="font-bold text-blue-400 mb-2">Description</h3>
            <p className="text-gray-300">{question.problemStatement}</p> {/* renamed */}
          </div>

          {question.TestCases && question.TestCases.length > 0 /* renamed */ && (
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h3 className="font-bold text-green-400 mb-3">Test Cases</h3>
              <div className="space-y-2">
                {question.TestCases.map((tc /* renamed */) => (
                  <div key={tc.id} className="bg-gray-900/50 p-3 rounded">
                    <p className="font-mono text-sm">
                      <span className="text-blue-400">Input:</span> {tc.input}
                    </p>
                    <p className="font-mono text-sm">
                      <span className="text-green-400">Output:</span> {tc.expectedOutput}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {question.BuggyCodes && question.BuggyCodes.length > 0 /* renamed */ && (
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h3 className="font-bold text-orange-400 mb-3">Buggy Code</h3>
              <div className="space-y-2">
                {question.BuggyCodes.map((bc /* renamed */) => (
                  <div key={bc.id} className="bg-gray-900/50 p-3 rounded">
                    <p className="text-orange-400 font-bold mb-2">{bc.language}</p>
                    <pre className="font-mono text-xs text-gray-300">{bc.code}</pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button
          onClick={onClose}
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 font-bold rounded-lg"
        >
          Close
        </Button>
      </div>
    </div>
  );
}
