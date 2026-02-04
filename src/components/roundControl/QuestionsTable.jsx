import React from 'react';
import { Button } from '../ui/button';

export default function QuestionsTable({
  questions,
  onAddQuestion,
  onViewQuestion,
  onEditQuestion,
  onDeleteQuestion,
  questionLoadingMap = {},
  disabled = false,
}) {
  const renderRow = (q, i) => {
    return (
      <tr
        key={q.id}
        className={`border-b border-gray-800 hover:bg-blue-500/5 ${
          i % 2 === 1 ? 'bg-gray-900/50' : ''
        }`}
      >
        <td className="px-6 py-5">
          <p className="font-bold text-base mb-1">{q.title}</p>
          {/* <p className="text-sm text-gray-400">{q.problemStatement}</p> */}
        </td>
        <td className="px-6 py-5">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/40 shadow-lg shadow-green-500/10">
              <span className="font-bold text-green-400 text-base">
                {(q.TestCases || q.testCases || []).length}
              </span>
            </div>
          </div>
        </td>
        <td className="px-6 py-5">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500/40 shadow-lg shadow-orange-500/10">
              <span className="font-bold text-orange-400 text-base">
                {(q.BuggyCodes || q.buggyCodes || []).length}
              </span>
            </div>
          </div>
        </td>

        <td className="px-6 py-5">
          <div className="flex gap-2">
            <button
              onClick={() => onViewQuestion(q)}
              className={`px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-2 border-blue-500/40 font-bold hover:from-blue-500/30 hover:to-cyan-500/30 transition-all shadow-lg shadow-blue-500/10 `}
            >
              View
            </button>
            <button
              onClick={() => onEditQuestion && onEditQuestion(q)}
              disabled={questionLoadingMap?.[q.id]}
              className={`px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-2 border-blue-500/40 font-bold ${
                questionLoadingMap?.[q.id] ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {questionLoadingMap?.[q.id] ? <span className="spinner inline-block mr-2" /> : null}
              Edit
            </button>
            <button
              onClick={() => onDeleteQuestion(q.id)}
              disabled={questionLoadingMap?.[q.id]}
              className={`px-4 py-2 rounded-lg bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border-2 border-red-500/40 font-bold ${
                questionLoadingMap?.[q.id] ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {questionLoadingMap?.[q.id] ? <span className="spinner inline-block mr-2" /> : null}
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold border border-blue-500/30">
            {questions.length} questions
          </span>
        </div>

        <Button
          disabled={disabled}
          onClick={onAddQuestion}
          className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          + Add Question
        </Button>
      </div>

      <div className="border-2 border-blue-500/20 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b-2 border-blue-500/30">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold">📋 Title</th>
              <th className="px-6 py-4 text-center text-sm font-bold"> Test Cases</th>
              <th className="px-6 py-4 text-center text-sm font-bold"> Buggy Codes</th>
              <th className="px-6 py-4 text-left text-sm font-bold">⚡ Actions</th>
            </tr>
          </thead>
          <tbody>{(questions || []).map(renderRow)}</tbody>
        </table>
      </div>
    </div>
  );
}
