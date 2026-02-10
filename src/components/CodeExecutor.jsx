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
      if (item.language && item.code) acc[item.language] = item.code;
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

  const monacoLanguage = monacoLanguageMap[language] || 'plaintext';

  // Define a vibrant, VS Code-style theme
  function handleEditorWillMount(monaco) {
    monaco.editor.defineTheme('vibrant-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        // Comments - Green & Italic
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'comment.line', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'comment.block', foreground: '6A9955', fontStyle: 'italic' },

        // Keywords - Pink/Magenta & Bold
        { token: 'keyword', foreground: 'C586C0', fontStyle: 'bold' },
        { token: 'keyword.control', foreground: 'C586C0', fontStyle: 'bold' },
        { token: 'keyword.operator', foreground: 'D4D4D4' },
        { token: 'storage', foreground: '569CD6' },
        { token: 'storage.type', foreground: '569CD6' },
        { token: 'storage.modifier', foreground: '569CD6' },

        // Strings - Orange
        { token: 'string', foreground: 'CE9178' },
        { token: 'string.quoted', foreground: 'CE9178' },
        { token: 'string.regexp', foreground: 'D16969' },

        // Numbers - Light Green
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'constant.numeric', foreground: 'B5CEA8' },

        // Functions - Yellow
        { token: 'entity.name.function', foreground: 'DCDCAA' },
        { token: 'support.function', foreground: 'DCDCAA' },
        { token: 'meta.function-call', foreground: 'DCDCAA' },

        // Variables - Light Blue
        { token: 'variable', foreground: '9CDCFE' },
        { token: 'variable.parameter', foreground: '9CDCFE' },
        { token: 'variable.other', foreground: '9CDCFE' },

        // Types & Classes - Cyan/Teal
        { token: 'entity.name.type', foreground: '4EC9B0' },
        { token: 'entity.name.class', foreground: '4EC9B0' },
        { token: 'support.type', foreground: '4EC9B0' },
        { token: 'support.class', foreground: '4EC9B0' },

        // Constants - Purple
        { token: 'constant', foreground: '4FC1FF' },
        { token: 'constant.language', foreground: '569CD6' },
        { token: 'constant.character', foreground: '569CD6' },

        // Operators & Delimiters
        { token: 'delimiter', foreground: 'D4D4D4' },
        { token: 'delimiter.bracket', foreground: 'FFD700' },
        { token: 'delimiter.parenthesis', foreground: 'FFD700' },
        { token: 'delimiter.square', foreground: 'FFD700' },

        // Preprocessor - C/C++
        { token: 'meta.preprocessor', foreground: 'C586C0' },
        { token: 'keyword.control.directive', foreground: 'C586C0' },

        // Python specific
        { token: 'support.function.builtin.python', foreground: 'DCDCAA' },
        { token: 'constant.language.python', foreground: '569CD6' },

        // Java specific
        { token: 'storage.type.java', foreground: '569CD6' },
        { token: 'keyword.other.import.java', foreground: 'C586C0' },
        { token: 'keyword.other.package.java', foreground: 'C586C0' },

        // Invalid/Error
        { token: 'invalid', foreground: 'F44747', fontStyle: 'italic' },
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editorLineNumber.foreground': '#858585',
        'editorLineNumber.activeForeground': '#c6c6c6',
        'editorCursor.foreground': '#ff6600',
        'editor.selectionBackground': '#264f78',
        'editor.inactiveSelectionBackground': '#3a3d41',
        'editor.lineHighlightBackground': '#2a2a2a',
        'editorWhitespace.foreground': '#404040',
        'editorIndentGuide.background': '#404040',
        'editorIndentGuide.activeBackground': '#707070',
        'editor.findMatchBackground': '#515c6a',
        'editor.findMatchHighlightBackground': '#ea5c0055',
        'editorBracketMatch.background': '#0064001a',
        'editorBracketMatch.border': '#888888',
      },
    });
  }

  function handleEditorDidMount(editor, monaco) {
    // Ensure language is set correctly
    const model = editor.getModel();
    if (model) {
      monaco.editor.setModelLanguage(model, monacoLanguage);
    }
  }

  useEffect(() => {
    setEditorCode(parsedCodes[language] || '// No code available');
  }, [language, parsedCodes]);

  const submitCode = async () => {
    if (!questionId || !roundId || !userId) return;

    setLoading(true);
    setOutput('Submitting...');
    setIsError(false);

    try {
      const res = await api.post(`/rounds/${roundId}/questions/${questionId}/submit`, {
        code: editorCode,
        language,
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

  useImperativeHandle(ref, () => ({
    runWithInput: () => {},
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

          <div className="flex-1 z-10">
            <Editor
              height="100%"
              language={monacoLanguage}
              theme="vibrant-dark"
              value={editorCode}
              onChange={(v) => setEditorCode(v || '')}
              beforeMount={handleEditorWillMount}
              onMount={handleEditorDidMount}
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
