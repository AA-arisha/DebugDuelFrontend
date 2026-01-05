import { useState, useEffect, useMemo } from 'react'
import api from '../api' // Adjust the import path to wherever your axios instance is

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
}`
}

export default function CodeExecutor({ code: buggyCodes = {}, problemId }) {
  // Handle if buggyCodes is a string (JSON) - parse it
  const parsedCodes = useMemo(() => {
    if (typeof buggyCodes === 'string') {
      try {
        return JSON.parse(buggyCodes);
      } catch (e) {
        return {};
      }
    }
    return buggyCodes;
  }, [buggyCodes]);
  
  // Extract available languages from code prop
  const availableLanguages = Object.keys(parsedCodes).filter(lang => {
    // Filter out numeric keys and only keep valid language keys
    return parsedCodes[lang] && isNaN(lang)
  })
  
  // Fallback to default languages if none provided
  const languages = availableLanguages.length > 0 
    ? availableLanguages 
    : ['cpp', 'python', 'javascript', 'java']
  
  // Set initial language (first available or 'cpp')
  const [language, setLanguage] = useState(languages[0] || 'cpp')
  const [editorCode, setEditorCode] = useState('')
  const [inputData, setInputData] = useState('') // New state for input
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  // Update code when language changes
  useEffect(() => {
    const selectedCode = parsedCodes[language] || FALLBACK_CODE[language] || '// No code available'
    setEditorCode(selectedCode)
  }, [language, parsedCodes])

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
    setOutput('') // Clear output when changing language
    setIsError(false)
  }

  const runCode = async () => {
    setLoading(true)
    setOutput('')
    setIsError(false)
    
    try {
      // Send code, language, and input data to backend using axios
      const response = await api.post('/run', {
        code: editorCode,
        language: language,
        stdin: inputData // Send input data as stdin
      })

      // Handle successful response
      setOutput(response.data.output || 'Code executed successfully!')
      setIsError(false)
    } catch (err) {
      // Handle error response
      setIsError(true)
      setOutput(err.response?.data?.message || err.message || 'Failed to execute code')
    } finally {
      setLoading(false)
    }
  }

  // Language display names
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
    php: 'PHP'
  }

  return (
    <div className="exec-panel">
      <div className="exec-header">
        <div className="language-selector">
          <span className="language-label">LANGUAGE</span>
          <select 
            className="select" 
            value={language}
            onChange={handleLanguageChange}
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>
                {languageNames[lang] || lang.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        
        <div className="actions-group">
          <button 
            className="button button-primary" 
            onClick={runCode} 
            disabled={loading}
          >
            {loading ? <span className="spinner" /> : '▶'}
            RUN CODE
          </button>
          
          <button 
            className="button button-submit" 
            onClick={async () => {
              if (!problemId) {
                alert('Problem ID is missing');
                return;
              }
              setLoading(true);
              try {
                const response = await api.post('/submit', {
                  code: editorCode,
                  language: language,
                  problemId: problemId
                });
                
                if (response.data.success) {
                  alert(`✓ All test cases passed! (${response.data.passedTests}/${response.data.totalTests})`);
                } else {
                  alert(`✗ Test case ${response.data.failedTest} failed\n\nExpected: ${response.data.expected}\nGot: ${response.data.actual}`);
                }
              } catch (err) {
                alert('Submission failed: ' + (err.response?.data?.message || err.message));
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
          >
            ✓ SUBMIT
          </button>
          
          {loading && (
            <span className="status-pill" aria-live="polite">
              <span className="spinner" /> Running...
            </span>
          )}
        </div>
      </div>

      <div className="editor-output-container">
        <div className="editor-container">
          <div className="editor-header">
            <div className="editor-dot"></div>
            <div className="editor-dot"></div>
            <div className="editor-dot"></div>
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
              placeholder="Enter input data here (stdin)..."
              spellCheck="false"
            />
          </div>

          <div className="output-container">
            <div className="output-header">
              <span className="output-title">📋 OUTPUT</span>
            </div>
            <div className={`terminal${isError ? ' error' : ''}${!output ? ' empty' : ''}`} aria-live="polite">
              {output || 'Output will appear here after running your code...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}