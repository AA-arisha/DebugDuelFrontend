import { useState, useEffect, useMemo } from 'react';
import api from '@/services/api';
import { useAuth } from '@/context/useAuth';

const FALLBACK_CODE = {
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World!" << endl;
    return 0;
}`,
  python: `print("Hello World!")`,
  javascript: `console.log("Hello World!");`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}`,
};

export default function CodeExecutor({
  code: buggyCodes = [],
  questionId,
  roundId = null,
  userAttempt = null,
  onSubmitSuccess = null,
}) {
  const { user } = useAuth();
  const userId = user?.userId || user?.id || null;

  const parsedCodes = useMemo(() => {
    if (!Array.isArray(buggyCodes)) return {};
    return buggyCodes.reduce((acc, item) => {
      if (item.language && item.code) acc[item.language] = item.code;
      return acc;
    }, {});
  }, [buggyCodes]);

  const availableLanguages = Object.keys(parsedCodes).filter((lang) => parsedCodes[lang]);
  const languages =
    availableLanguages.length > 0 ? availableLanguages : ['cpp', 'python', 'javascript', 'java'];

  const [language, setLanguage] = useState(languages[0]);
  const [editorCode, setEditorCode] = useState('');
  const [inputData, setInputData] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const selectedCode = parsedCodes[language] || FALLBACK_CODE[language] || '// No code available';
    setEditorCode(selectedCode);
  }, [language, parsedCodes]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setOutput('');
    setIsError(false);
  };

  const runCode = async () => {
    setLoading(true);
    setOutput('');
    setIsError(false);

    try {
      const response = await api.post('/run', {
        code: editorCode,
        language,
        stdin: inputData,
      });
      setOutput(response.data.output || 'Code executed successfully!');
    } catch (err) {
      setIsError(true);
      setOutput(err.response?.data?.message || err.message || 'Failed to execute code');
    } finally {
      setLoading(false);
    }
  };

  const submitCode = async () => {
    if (!questionId) return setOutput('Error: Question ID is missing');
    if (!userId) return setOutput('Error: You must be logged in to submit');
    if (!roundId) return setOutput('Error: Round ID is missing');

    setLoading(true);
    setOutput('Submitting...');

    try {
      const res = await api.post(`/rounds/${roundId}/questions/${questionId}/submit`, {
        code: editorCode,
        language,
        userId,
      });

      // Expect: { success: boolean, passedTests, totalTests, solved, attempts, message }
      const data = res.data || {};

      if (data.success || data.solved) {
        setIsError(false);
        setOutput(
          `✓ All test cases passed! (${data.passedTests ?? data.passed ?? 'N/A'}/${
            data.totalTests ?? data.total ?? 'N/A'
          })`
        );

        // notify parent (hook/page) to refresh attempts / leaderboards
        if (typeof onSubmitSuccess === 'function') onSubmitSuccess({ questionId, result: data });
      } else {
        setIsError(true);
        setOutput(
          data.message ||
            `✗ Submission failed: ${
              data.failedTest ? `Test ${data.failedTest}` : 'Some tests failed'
            }`
        );

        if (typeof onSubmitSuccess === 'function') onSubmitSuccess({ questionId, result: data });
      }
    } catch (err) {
      setIsError(true);
      const msg = err.response?.data?.message || err.message || 'Unknown submission error';
      setOutput('Submission failed: ' + msg);

      // specific handling for max attempts
      if (msg.toLowerCase().includes('max attempts') || err.response?.status === 429) {
        // consider disabling submit in UI via userAttempt change
      }

      if (typeof onSubmitSuccess === 'function')
        onSubmitSuccess({ questionId, result: { error: msg } });
    } finally {
      setLoading(false);
    }
  };

  const languageNames = {
    cpp: 'C++',
    python: 'Python',
    javascript: 'JavaScript',
    java: 'Java',
    c: 'C',
    csharp: 'C#',
    go: 'Go',
    rust: 'Rust',
    ruby: 'Ruby',
    php: 'PHP',
  };

  return (
    <div className="exec-panel">
      <div className="exec-header">
        <div className="language-selector">
          <span className="language-label">LANGUAGE</span>
          <select className="select" value={language} onChange={handleLanguageChange}>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {languageNames[lang] || lang.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="actions-group">
          <button className="button button-primary" onClick={runCode} disabled={loading}>
            {loading ? <span className="spinner" /> : '▶ RUN CODE'}
          </button>

          <button
            className="button button-submit"
            onClick={submitCode}
            disabled={loading || userAttempt?.solved || userAttempt?.attempts >= 3}
          >
            {userAttempt?.solved
              ? 'Solved'
              : userAttempt?.attempts >= 3
              ? 'Attempts exhausted'
              : '✓ SUBMIT'}
          </button>
        </div>
      </div>

      <div className="editor-output-container">
        <div className="editor-container">
          <div className="editor-header">
            <div className="editor-dot" />
            <div className="editor-dot" />
            <div className="editor-dot" />
          </div>

          <textarea
            className="editor"
            value={editorCode}
            onChange={(e) => setEditorCode(e.target.value)}
            spellCheck="false"
          />
        </div>

        <div className="input-output-container">
          <div className="input-container">
            <div className="input-header">
              <span className="input-title">📥 INPUT</span>
            </div>

            <textarea
              className="input-area"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder="Enter input data here..."
              spellCheck="false"
            />
          </div>

          <div className="output-container">
            <div className="output-header">
              <span className="output-title">📋 OUTPUT</span>
            </div>

            <div
              className={`terminal${isError ? ' error' : ''}${!output ? ' empty' : ''}`}
              aria-live="polite"
            >
              {output || 'Output will appear here after running your code...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
