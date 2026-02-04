import React from 'react';
import { Button } from '../ui/button';

export default function TestCaseManager({ testCases, onTestCasesChange }) {
  const addTestCase = () => {
    const newTestCase = {
      id: Date.now().toString(),
      input: '',
      expectedOutput: '',
      visible: true,
    };
    onTestCasesChange([...testCases, newTestCase]);
  };

  const updateTestCase = (id, field, value) => {
    const updated = testCases.map((tc) => (tc.id === id ? { ...tc, [field]: value } : tc));
    onTestCasesChange(updated);
  };

  const deleteTestCase = (id) => {
    onTestCasesChange(testCases.filter((tc) => tc.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
        <h3 className="text-lg font-semibold text-white">Test Cases</h3>
        <span className="px-2.5 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs font-medium border border-green-500/30">
          {testCases.length} {testCases.length === 1 ? 'case' : 'cases'}
        </span>
      </div>

      {testCases.length === 0 ? (
        <div className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-2 border-dashed border-green-500/30 rounded-lg p-12 text-center">
          <div className="text-5xl mb-4">✅</div>
          <p className="text-gray-400 font-medium">No test cases added yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {testCases.map((testCase, index) => (
            <div
              key={testCase.id}
              className="border-2 border-green-500/20 rounded-lg p-5 bg-gradient-to-br from-green-500/5 to-emerald-500/5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                  <h4 className="font-semibold text-white">Test Case #{index + 1}</h4>
                </div>
                <button
                  onClick={() => deleteTestCase(testCase.id)}
                  className="px-4 py-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-md text-sm font-medium border border-red-500/30"
                >
                  🗑️ Delete
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">📥 Input</label>
                <textarea
                  value={testCase.input}
                  onChange={(e) => updateTestCase(testCase.id, 'input', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border-2 border-green-500/20 rounded-lg text-white text-sm font-mono"
                  rows={4}
                  placeholder="Enter test input..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  📤 Expected Output
                </label>
                <textarea
                  value={testCase.expectedOutput}
                  onChange={(e) => updateTestCase(testCase.id, 'expectedOutput', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border-2 border-green-500/20 rounded-lg text-white text-sm font-mono"
                  rows={4}
                  placeholder="Enter expected output..."
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <input
                  type="checkbox"
                  checked={testCase.visible}
                  onChange={(e) => updateTestCase(testCase.id, 'visible', e.target.checked)}
                  className="w-5 h-5"
                />
                <label className="text-sm font-semibold text-white">
                  👁️ Visible to contestants
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button
        onClick={addTestCase}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-6 shadow-lg rounded-lg"
      >
        + Add Test Case
      </Button>
    </div>
  );
}
