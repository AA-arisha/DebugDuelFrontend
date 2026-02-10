import { useState, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react';
import Editor from '@monaco-editor/react';
import api from '@/services/api';
import { useAuth } from '@/context/useAuth';

const monacoLanguageMap = {
  cpp: 'cpp',
  c: 'c',
  python: 'python',
  java: 'java',
};

const languageNames = {
  cpp: 'C++',
  python: 'Python',
  java: 'Java',
  c: 'C',
};

export default forwardRef(function CodeExecutor(
  { code: buggyCodes = [], questionId, roundId, userAttempt = null, onSubmitSuccess = null },
  ref
) {
  const { user } = useAuth();
  const userId = user?.userId || user?.id || null;

  const parsedCodes = useMemo(() => {
    if (!Array.isArray(buggyCodes)) return {};
    return buggyCodes.reduce((acc, item) => {
      // Normalize language key to lowercase for consistent lookups
      if (item.language && item.code) {
        const normalizedLang = item.language.toLowerCase();
        acc[normalizedLang] = item.code;
      }
      return acc;
    }, {});
  }, [buggyCodes]);

  const availableLanguages = Object.keys(parsedCodes).filter((l) => parsedCodes[l]);
  const languages =
    availableLanguages.length > 0 ? availableLanguages : ['cpp', 'python', 'c', 'java'];

  const [language, setLanguage] = useState(languages[0]);
  const [editorCode, setEditorCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Convert language to lowercase for Monaco mapping
  const monacoLanguage = monacoLanguageMap[language?.toLowerCase()] || 'plaintext';

  // Define a cyberpunk orange/green theme
  function handleEditorWillMount(monaco) {
    // Always define the theme (Monaco handles duplicates gracefully)
    monaco.editor.defineTheme('vibrant-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        // Comments - Muted Orange & Italic
        { token: 'comment', foreground: 'CC8844', fontStyle: 'italic' },
        { token: 'comment.line', foreground: 'CC8844', fontStyle: 'italic' },
        { token: 'comment.block', foreground: 'CC8844', fontStyle: 'italic' },
        { token: 'comment.documentation', foreground: 'CC8844', fontStyle: 'italic' },

        // Keywords - Bright Orange & Bold
        { token: 'keyword', foreground: 'FF7A00', fontStyle: 'bold' },
        { token: 'keyword.control', foreground: 'FF7A00', fontStyle: 'bold' },
        { token: 'keyword.operator', foreground: 'FF9440', fontStyle: 'bold' },
        { token: 'storage', foreground: 'FF7A00', fontStyle: 'bold' },
        { token: 'storage.type', foreground: 'FF7A00', fontStyle: 'bold' },
        { token: 'storage.modifier', foreground: 'FF7A00', fontStyle: 'bold' },

        // Strings - Neon Green
        { token: 'string', foreground: '00FF88' },
        { token: 'string.quoted', foreground: '00FF88' },
        { token: 'string.regexp', foreground: '00DD77' },
        { token: 'string.double', foreground: '00FF88' },
        { token: 'string.single', foreground: '00FF88' },

        // Numbers - Lime Green
        { token: 'number', foreground: '88FF44' },
        { token: 'constant.numeric', foreground: '88FF44' },

        // Functions - Bright Orange/Yellow
        { token: 'entity.name.function', foreground: 'FFAA33' },
        { token: 'support.function', foreground: 'FFAA33' },
        { token: 'meta.function-call', foreground: 'FFAA33' },
        { token: 'entity.name.method', foreground: 'FFAA33' },

        // Variables & Identifiers - Cyan/Green
        { token: 'variable', foreground: '00FFCC' },
        { token: 'variable.parameter', foreground: '00FFCC' },
        { token: 'variable.other', foreground: '00FFCC' },
        { token: 'variable.language', foreground: 'FF7A00' },
        { token: 'identifier', foreground: '00FFCC' },
        { token: 'meta.definition.variable', foreground: '00FFCC' },

        // Types & Classes - Electric Green
        { token: 'entity.name.type', foreground: '44FF66' },
        { token: 'entity.name.class', foreground: '44FF66' },
        { token: 'support.type', foreground: '44FF66' },
        { token: 'support.class', foreground: '44FF66' },
        { token: 'entity.name.namespace', foreground: '44FF66' },

        // Constants - Orange
        { token: 'constant', foreground: 'FFAA00' },
        { token: 'constant.language', foreground: 'FF8800' },
        { token: 'constant.character', foreground: 'FF8800' },
        { token: 'variable.other.constant', foreground: 'FFAA00' },

        // Operators & Delimiters - White/Orange
        { token: 'delimiter', foreground: 'DDDDDD' },
        { token: 'delimiter.bracket', foreground: 'FF7A00' },
        { token: 'delimiter.parenthesis', foreground: 'FF7A00' },
        { token: 'delimiter.square', foreground: 'FF7A00' },
        { token: 'delimiter.curly', foreground: 'FF7A00' },
        { token: 'punctuation', foreground: 'DDDDDD' },

        // Preprocessor - Bright Orange
        { token: 'meta.preprocessor', foreground: 'FF9440' },
        { token: 'keyword.control.directive', foreground: 'FF9440' },
        { token: 'keyword.control.import', foreground: 'FF9440' },

        // Python specific
        { token: 'support.function.builtin.python', foreground: 'FFAA33' },
        { token: 'constant.language.python', foreground: 'FF7A00' },
        { token: 'keyword.operator.logical.python', foreground: 'FF7A00' },

        // Java specific
        { token: 'storage.type.java', foreground: 'FF7A00' },
        { token: 'keyword.other.import.java', foreground: 'FF9440' },
        { token: 'keyword.other.package.java', foreground: 'FF9440' },
        { token: 'storage.type.annotation.java', foreground: 'FFAA33' },

        // C/C++ specific
        { token: 'storage.type.built-in.primitive.c', foreground: 'FF7A00' },
        { token: 'storage.type.built-in.primitive.cpp', foreground: 'FF7A00' },

        // Invalid/Error - Red
        { token: 'invalid', foreground: 'FF4444', fontStyle: 'italic' },

        // Default text - Light gray/white
        { token: '', foreground: 'E6E6E6' },
      ],
      colors: {
        'editor.background': '#0a0a0a',
        'editor.foreground': '#e6e6e6',
        'editorLineNumber.foreground': '#666666',
        'editorLineNumber.activeForeground': '#ff7a00',
        'editorCursor.foreground': '#00ff88',
        'editor.selectionBackground': '#ff7a0033',
        'editor.inactiveSelectionBackground': '#ff7a0022',
        'editor.lineHighlightBackground': '#1a1a1a',
        'editorWhitespace.foreground': '#333333',
        'editorIndentGuide.background': '#222222',
        'editorIndentGuide.activeBackground': '#ff7a00',
        'editor.findMatchBackground': '#ff7a0044',
        'editor.findMatchHighlightBackground': '#ff7a0022',
        'editorBracketMatch.background': '#ff7a0033',
        'editorBracketMatch.border': '#ff7a00',
      },
    });
  }

  function handleEditorDidMount(editor, monaco) {
    // Get the model and ensure language is properly set
    const model = editor.getModel();
    if (model) {
      // Set the correct language - this triggers tokenization
      monaco.editor.setModelLanguage(model, monacoLanguage);
    }

    // Apply custom theme to editor
    monaco.editor.setTheme('vibrant-dark');
  }

  useEffect(() => {
    // Convert language to lowercase for parsedCodes lookup
    const langKey = language?.toLowerCase();
    const newCode = parsedCodes[langKey] || '// No code available';
    setEditorCode(newCode);
  }, [language, parsedCodes]);

  const submitCode = async () => {
    console.log('🚀 Submit button clicked');
    console.log('📊 Submit Data:', {
      questionId,
      roundId,
      userId,
      language: language?.toLowerCase(),
      codeLength: editorCode?.length,
    });

    if (!questionId || !roundId || !userId) {
      console.error('❌ Missing required data:', { questionId, roundId, userId });
      setIsError(true);
      setOutput('Error: Missing required data (questionId, roundId, or userId)');
      return;
    }

    setLoading(true);
    setOutput('Submitting...');
    setIsError(false);

    try {
      const res = await api.post(`/rounds/${roundId}/questions/${questionId}/submit`, {
        code: editorCode,
        language: language?.toLowerCase(), // Send lowercase to backend
        userId,
      });

      const data = res.data || {};
      setIsError(!(data.success || data.solved));
      setOutput(
        data.success || data.solved
          ? 'Code executed successfully!'
          : data.message || 'Some tests failed'
      );

      onSubmitSuccess?.({ questionId, result: data });
    } catch (err) {
      setIsError(true);
      setOutput(err.response?.data?.message || 'Submission failed');
      onSubmitSuccess?.({ questionId, result: { error: err.message } });
    } finally {
      setLoading(false);
    }
  };

  const runWithInput = async (testInput) => {
    console.log('🏃 Run with input called:', testInput);

    if (!testInput) {
      setIsError(true);
      setOutput('Error: No test input provided');
      return;
    }

    setLoading(true);
    setOutput('Running test...');
    setIsError(false);

    try {
      const res = await api.post('/run', {
        language: language?.toLowerCase(),
        code: editorCode,
        stdin: testInput,
      });

      const data = res.data || {};

      if (data.error) {
        setIsError(true);
        setOutput(data.error);
      } else {
        setIsError(false);
        setOutput(data.output || 'Code executed successfully!');
      }
    } catch (err) {
      setIsError(true);
      setOutput(err.response?.data?.message || err.message || 'Test run failed');
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    runWithInput,
  }));

  return (
    <div className="flex flex-col gap-5 max-w-[1400px] mx-auto">
      {/* HEADER */}
      <div
        className="scanlines relative flex flex-wrap items-center justify-between gap-4
        rounded-xl border-2 border-orange-500
        bg-gradient-to-b from-[rgba(122,63,42,0.12)] to-[rgba(0,0,0,0.4)]
        px-6 py-4 shadow-[0_0_18px_rgba(255,122,0,0.35)]
        overflow-hidden"
      >
        <div className="flex items-center gap-4 z-10">
          <span
            className="text-sm font-semibold tracking-wide text-orange-400
            drop-shadow-[0_0_10px_rgba(255,122,0,0.35)] font-['Orbitron']"
          >
            LANGUAGE
          </span>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#0f0f0f] text-zinc-200 border border-white/10
              rounded-lg px-4 py-2 text-sm font-mono min-w-[180px]
              focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {languageNames[lang] || lang.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={submitCode}
          disabled={loading || userAttempt?.solved || userAttempt?.attempts >= 3}
          className="relative z-10 overflow-hidden flex items-center justify-center gap-2
            rounded-lg border-2 px-5 py-2 text-sm font-semibold tracking-wide
            font-['Orbitron'] transition-all
            hover:-translate-y-0.5
            hover:shadow-[0_6px_20px_rgba(16,185,129,0.45)]
            disabled:opacity-50 disabled:cursor-not-allowed
            bg-gradient-to-br from-emerald-500 to-emerald-600
            border-emerald-500 text-zinc-900"
        >
          {userAttempt?.solved
            ? 'Solved'
            : userAttempt?.attempts >= 3
            ? 'Attempts exhausted'
            : '✓ SUBMIT'}
        </button>
      </div>

      {/* EDITOR + OUTPUT */}
      <div className="grid grid-cols-[1.5fr_1fr] gap-5 h-[80vh] max-md:grid-cols-1">
        {/* EDITOR */}
        <div
          className="scanlines relative flex flex-col h-full overflow-hidden rounded-xl
          border-2 border-orange-500
          bg-gradient-to-b from-[rgba(122,63,42,0.12)] to-[rgba(0,0,0,0.4)]
          shadow-[0_0_18px_rgba(255,122,0,0.35)]"
        >
          <div
            className="flex items-center gap-2 px-4 py-3
            bg-black/50 border-b border-white/10 z-10 shrink-0"
          >
            <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_currentColor]" />
            <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_currentColor]" />
            <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_currentColor]" />
          </div>

          <div
            className="flex-1 z-10"
            style={{
              isolation: 'isolate',
              position: 'relative',
            }}
          >
            {/* Allow Monaco's inline styles to work properly */}
            <style>{`
              /* Remove global CSS interference - let Monaco control its colors */
              .monaco-editor .view-lines .view-line span[style*="color"] {
                color: revert !important;
              }
            `}</style>
            <Editor
              height="100%"
              language={monacoLanguage}
              theme="vibrant-dark"
              value={editorCode}
              onChange={(v) => setEditorCode(v || '')}
              beforeMount={handleEditorWillMount}
              onMount={handleEditorDidMount}
              loading="Loading editor..."
              key={`${language}-${monacoLanguage}`}
              options={{
                fontSize: 15,
                fontFamily: "'Fira Code', 'Consolas', 'Courier New', monospace",
                fontLigatures: true,
                minimap: { enabled: false },
                automaticLayout: true,
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                autoClosingBrackets: 'always',
                autoClosingQuotes: 'always',
                autoIndent: 'full',
                tabSize: 4,
                insertSpaces: true,
                detectIndentation: true,
                bracketPairColorization: { enabled: true },
                guides: {
                  bracketPairs: true,
                  indentation: true,
                },
                renderWhitespace: 'selection',
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: 'on',
                smoothScrolling: true,
                padding: { top: 16, bottom: 16 },
                lineNumbers: 'on',
                glyphMargin: true,
                folding: true,
                renderLineHighlight: 'all',
                scrollbar: {
                  verticalScrollbarSize: 10,
                  horizontalScrollbarSize: 10,
                },
                suggest: {
                  showKeywords: true,
                  showSnippets: true,
                },
                quickSuggestions: {
                  other: true,
                  comments: false,
                  strings: false,
                },
                parameterHints: { enabled: true },
                formatOnPaste: true,
                formatOnType: true,
                // Critical for syntax highlighting
                'semanticHighlighting.enabled': true,
                theme: 'vibrant-dark',
                colorDecorators: true,
              }}
            />
          </div>
        </div>

        {/* OUTPUT */}
        <div
          className="scanlines relative flex flex-col h-full overflow-hidden rounded-xl
          border-2 border-orange-500
          bg-gradient-to-b from-[rgba(122,63,42,0.12)] to-[rgba(0,0,0,0.4)]
          shadow-[0_0_18px_rgba(255,122,0,0.35)]"
        >
          <div
            className="flex items-center justify-between px-4 py-3
            bg-black/50 border-b border-white/10 z-10 shrink-0"
          >
            <span
              className="text-sm font-semibold tracking-wide text-orange-400
              font-['Orbitron']
              drop-shadow-[0_0_10px_rgba(255,122,0,0.35)]"
            >
              📋 OUTPUT
            </span>
          </div>

          <div
            className={`flex-1 z-10 overflow-auto p-5 text-sm font-mono leading-relaxed
              bg-[#0f0f0f] whitespace-pre-wrap
              ${isError ? 'text-red-400 animate-[shake_0.32s_ease-in-out]' : 'text-cyan-300'}
            `}
          >
            {output || (
              <span className="italic text-zinc-500">
                Output will appear here after running your code...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
