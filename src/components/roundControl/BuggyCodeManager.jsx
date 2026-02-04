import React from 'react';
import { Button } from '../ui/button';

export default function BuggyCodeManager({ buggyCode, onBuggyCodeChange }) {
  const LANGUAGES = ['Python', 'JavaScript', 'Java', 'C++', 'Go', 'Rust', 'Ruby', 'PHP'];

  const addBuggyCode = () => {
    const newBuggyCode = {
      id: Date.now().toString(),
      language: 'Python',
      code: '',
    };
    onBuggyCodeChange([...buggyCode, newBuggyCode]);
  };

  const updateBuggyCode = (id, field, value) => {
    const updated = buggyCode.map((bc) => (bc.id === id ? { ...bc, [field]: value } : bc));
    onBuggyCodeChange(updated);
  };

  const deleteBuggyCode = (id) => {
    onBuggyCodeChange(buggyCode.filter((bc) => bc.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
        <h3 className="text-lg font-semibold text-white">Buggy Code</h3>
        <span className="px-2.5 py-0.5 bg-orange-500/20 text-orange-400 rounded-full text-xs font-medium border border-orange-500/30">
          {buggyCode.length} {buggyCode.length === 1 ? 'snippet' : 'snippets'}
        </span>
      </div>

      {buggyCode.length === 0 ? (
        <div className="bg-gradient-to-br from-orange-500/5 to-red-500/5 border-2 border-dashed border-orange-500/30 rounded-lg p-12 text-center">
          <div className="text-5xl mb-4">🐛</div>
          <p className="text-gray-400 font-medium">No buggy code added yet</p>
          <p className="text-sm text-gray-500 mt-2">
            Add code snippets with intentional bugs for contestants to fix
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {buggyCode.map((code, index) => (
            <div
              key={code.id}
              className="border-2 border-orange-500/20 rounded-lg p-5 bg-gradient-to-br from-orange-500/5 to-red-500/5 hover:border-orange-500/40 transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <h4 className="font-semibold text-white">Buggy Code #{index + 1}</h4>
                </div>

                <button
                  onClick={() => deleteBuggyCode(code.id)}
                  className="px-4 py-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-md text-sm font-medium border border-red-500/30"
                >
                  🗑️ Delete
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">💻 Language</label>
                <select
                  value={code.language}
                  onChange={(e) => updateBuggyCode(code.id, 'language', e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-800/50 border-2 border-orange-500/20 rounded-lg text-white focus:ring-2 focus:ring-orange-500"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">🐞 Buggy Code</label>
                <textarea
                  value={code.code}
                  onChange={(e) => updateBuggyCode(code.id, 'code', e.target.value)}
                  rows={8}
                  wrap="off"
                  spellCheck={false}
                  className="w-full px-4 py-3 bg-gray-800/50 border-2 border-orange-500/20 rounded-lg text-white placeholder-gray-500 font-mono text-sm focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter buggy code here..."
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <Button
        onClick={addBuggyCode}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-6 rounded-lg"
      >
        + Add Buggy Code Snippet
      </Button>
    </div>
  );
}
