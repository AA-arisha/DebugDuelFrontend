import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'; // keep if using react-router
import api from '../../services/api';
import { useEffect, useState, useRef } from 'react';
import CodeExecutor from '@/components/CodeExecutor';
import { getSocket } from '@/services/socket';
import useRoundDetails from '../../hooks/useRoundDetails';
import { useAuth } from '@/context/useAuth';
import '@/styles/QuestionPage.css';
import Timer from '@/components/participant/TimerParticipant';

export default function QuestionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const executorRef = useRef(null);
  const socket = getSocket();

  // Track output and loading state for each test case
  const [testCaseOutputs, setTestCaseOutputs] = useState({});
  const [testCaseLoading, setTestCaseLoading] = useState({});

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await api.get(`/question/${id}`);
        setProblem(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  // Fetch round details to get startAt and endAt for the timer
  const { roundInfo } = useRoundDetails(problem?.roundId);

  // Join the global competition room to receive live round updates
  useEffect(() => {
    if (!socket || !problem) return;
    socket.emit('join', 'competition_overall');
    return () => {
      socket.emit('leave', 'competition_overall');
    };
  }, [socket, problem]);

  // Listen for round status changes and navigate when round is completed
  useEffect(() => {
    if (!socket || !problem) return;
    const roundId = problem.roundId;

    const handler = (updatedRound) => {
      console.log('[QuestionDetailPage] round_updated event received:', updatedRound);
      if (!updatedRound) return;

      // only react to updates for our round
      if (String(updatedRound.id) !== String(roundId)) {
        console.log('[QuestionDetailPage] not our round, ignoring');
        return;
      }

      // Navigate to battle rounds when round is completed
      if (updatedRound.status === 'COMPLETED') {
        console.log('[QuestionDetailPage] round completed, navigating to battle rounds');
        navigate('/battleRounds');
      }
    };

    socket.on('round_updated', handler);
    return () => {
      socket.off('round_updated', handler);
    };
  }, [socket, problem, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!problem) return <p>No problem found.</p>;

  const visibleTestCases = problem.testcases?.filter((tc) => tc.isVisible) || [];

  const backRoundId = location.state?.roundId;

  // Function to run a specific test case
  const runTestCase = async (testCase, index) => {
    const testCaseKey = testCase.id || index;

    console.debug('[QuestionDetailPage] Run test clicked', {
      testCaseInput: testCase.input,
    });

    // Get the current code from CodeExecutor
    const currentCode = executorRef.current?.getCode?.();
    const currentLanguage = executorRef.current?.getLanguage?.();

    if (!currentCode || !currentLanguage) {
      setTestCaseOutputs((prev) => ({
        ...prev,
        [testCaseKey]: { output: 'Error: Unable to get current code', isError: true },
      }));
      return;
    }

    setTestCaseLoading((prev) => ({ ...prev, [testCaseKey]: true }));
    setTestCaseOutputs((prev) => ({
      ...prev,
      [testCaseKey]: { output: 'Running test...', isError: false },
    }));

    try {
      const res = await api.post('/run', {
        language: currentLanguage.toLowerCase(),
        code: currentCode,
        stdin: testCase.input,
      });

      const data = res.data || {};

      if (data.error) {
        setTestCaseOutputs((prev) => ({
          ...prev,
          [testCaseKey]: { output: data.error, isError: true },
        }));
      } else {
        setTestCaseOutputs((prev) => ({
          ...prev,
          [testCaseKey]: { output: data.output || 'Code executed successfully!', isError: false },
        }));
      }
    } catch (err) {
      setTestCaseOutputs((prev) => ({
        ...prev,
        [testCaseKey]: {
          output: err.response?.data?.message || err.message || 'Test run failed',
          isError: true,
        },
      }));
    } finally {
      setTestCaseLoading((prev) => ({ ...prev, [testCaseKey]: false }));
    }
  };

  return (
    <div className="question-page p-5">
      <div className="question-page__back-link">
        <Link to={backRoundId ? `/questions/${backRoundId}` : '/battleRounds'} className="brand">
          ← Back
        </Link>
        <div className="max-w-6xl mx-auto mb-4 flex justify-end relative z-10">
          <Timer roundId={problem?.roundId} startAt={roundInfo?.startAt} endAt={roundInfo?.endAt} />
        </div>
      </div>

      <div className="question-page__problem-section">
        <h3 className="question-page__section-title">Problem: {problem.title}</h3>
        <div className="question-page__problem-statement">
          <p>{problem.problemStatement}</p>
        </div>
      </div>

      <CodeExecutor
        ref={executorRef}
        code={problem.buggyCodes}
        questionId={problem.id}
        roundId={problem.roundId}
        userId={user?.userId || user?.id}
      />

      <div className="question-page__test-cases-section m-5">
        <h3 className="question-page__section-title">Test Cases</h3>
        <div className="question-page__test-cases-list">
          {visibleTestCases.length > 0 ? (
            visibleTestCases.map((testCase, index) => {
              const testCaseKey = testCase.id || index;
              const output = testCaseOutputs[testCaseKey];
              const isLoading = testCaseLoading[testCaseKey];

              return (
                <div className="question-page__test-case-card" key={testCase.id || index}>
                  <div className="question-page__test-case-header">
                    <span className="question-page__test-case-badge">Test Case {index + 1}</span>
                    <span className="question-page__test-case-desc">{testCase.description}</span>
                    <button
                      className="button button-primary"
                      onClick={() => runTestCase(testCase, index)}
                      disabled={isLoading}
                    >
                      {isLoading ? '⏳ RUNNING...' : '▶ RUN TEST'}
                    </button>
                  </div>
                  <div className="question-page__test-case-content">
                    <div className="question-page__test-case-item">
                      <label className="question-page__test-label">Input:</label>
                      <code className="question-page__test-code">{testCase.input}</code>
                    </div>
                    <div className="question-page__test-case-item">
                      <label className="question-page__test-label">Expected Output:</label>
                      <code className="question-page__test-code">{testCase.expectedOutput}</code>
                    </div>
                    {output && (
                      <div className="question-page__test-case-item">
                        <label className="question-page__test-label">Your Output:</label>
                        <code
                          className={`question-page__test-code ${
                            output.isError
                              ? 'question-page__test-code--error'
                              : 'question-page__test-code--success'
                          }`}
                        >
                          {output.output}
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No test cases available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
