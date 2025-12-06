import { useEffect, useMemo, useState } from 'react'

const PISTON_EXECUTE_URL = 'https://emkc.org/api/v2/piston/execute'
const PISTON_RUNTIMES_URL = 'https://emkc.org/api/v2/piston/runtimes'

const languageOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'cpp', label: 'C++' },
  { value: 'java', label: 'Java' },
]

const templates = {
  javascript: `// JavaScript
function sum(a, b) {
  return a + b;
}
console.log(sum(3, 5));
`,
  python: `# Python
def sum(a, b):
    return a + b
print(sum(3, 5))
`,
  cpp: `// C++
#include <iostream>
using namespace std;
int sum(int a, int b) { return a + b; }
int main() { cout << sum(3,5) << endl; return 0; }
`,
  java: `// Java
public class Main {
    static int sum(int a, int b) { return a + b; }
    public static void main(String[] args) {
        System.out.println(sum(3,5));
    }
}
`,
}

export default function CodeExecutor({ language: languageProp = 'javascript', code: codeProp = '', initialLanguage = 'javascript', initialCode = '' }) {
  const startLang = languageProp || initialLanguage
  const startCode = codeProp || initialCode || templates[startLang]
  const [language, setLanguage] = useState(startLang)
  const [code, setCode] = useState(startCode)
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  // Keep code in sync if parent changes props
  useEffect(() => {
    const nextLang = languageProp || initialLanguage
    const nextCode = codeProp || initialCode || templates[nextLang]
    setLanguage(nextLang)
    setCode(nextCode)
  }, [languageProp, codeProp, initialLanguage, initialCode])

  const fileName = useMemo(() => {
    const names = { javascript: 'main.js', python: 'main.py', cpp: 'main.cpp', java: 'Main.java' }
    return names[language] || 'main.txt'
  }, [language])

  const runCode = async () => {
    setLoading(true)
    setOutput('')
    setIsError(false)
    try {
      // Attempt without version first
      const payload = {
        language,
        files: [{ name: fileName, content: code }],
      }

      let response = await fetch(PISTON_EXECUTE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      let result = await response.json().catch(() => ({}))

      // Fallback: fetch version and retry when API complains
      if (!response.ok) {
        // Try to get a version for selected language
        const rtRes = await fetch(PISTON_RUNTIMES_URL).catch(() => null)
        if (rtRes && rtRes.ok) {
          const runtimes = await rtRes.json()
          const match = runtimes.find(r => r.language === language)
          if (match) {
            const retryPayload = { ...payload, version: match.version }
            response = await fetch(PISTON_EXECUTE_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(retryPayload),
            })
            result = await response.json().catch(() => ({}))
          }
        }
      }

      if (response.ok && result && result.run) {
        let text = ''
        if (result.compile?.stderr) text += `[COMPILE ERROR]\n${result.compile.stderr}\n\n`
        if (result.run.stderr) text += `[STDERR]\n${result.run.stderr}\n\n`
        text += `[STDOUT]\n${result.run.stdout || '(no output)'}\n`
        if (result.run.code !== 0) text += `\n[Exit Code] ${result.run.code}`
        setIsError(result.run.code !== 0)
        setOutput(text)
      } else {
        const msg = result?.message || 'Execution failed. Please check your code and language.'
        setIsError(true)
        setOutput(`Error: ${msg}`)
      }
    } catch (err) {
      setIsError(true)
      setOutput(`Network or runtime error: ${err?.message || String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="exec-panel">
      <div className="exec-row">
        <label>Language</label>
        <select className="select" value={language} onChange={(e) => {
          const lang = e.target.value
          setLanguage(lang)
          setCode(templates[lang])
        }}>
          {languageOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <button className="button button-primary" onClick={runCode} disabled={loading}>
          {loading ? <span className="spinner" /> : 'Run Code'}
        </button>
        {loading && (
          <span className="status-pill" aria-live="polite">
            <span className="spinner" /> Running...
          </span>
        )}
      </div>

      <textarea className="editor" value={code} onChange={(e) => setCode(e.target.value)} spellCheck="false" />

      <div className={`terminal${isError ? ' error' : ''}`} aria-live="polite">
        {output || 'Output will appear here...'}
      </div>
    </div>
  )
}