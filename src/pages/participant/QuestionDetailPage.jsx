import { useParams, Link, useLocation } from 'react-router-dom'; // keep if using react-router
import api from '../../services/api';
import { useEffect, useState, useRef } from 'react';
import CodeExecutor from '@/components/CodeExecutor';
import '@/styles/QuestionPage.css';

export default function QuestionDetailPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const executorRef = useRef(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!problem) return <p>No problem found.</p>;

  const visibleTestCases = problem.testcases?.filter((tc) => tc.isVisible) || [];

  const backRoundId = location.state?.roundId;

  return (
    <div className="question-page">
      <div className="question-page__back-link">
        <Link to={backRoundId ? `/questions/${backRoundId}` : '/battleRounds'} className="brand">
          ← Back
        </Link>
      </div>

      <div className="question-page__problem-section">
        <h3 className="question-page__section-title">Problem: {problem.title}</h3>
        <div className="question-page__problem-statement">
          <p>{problem.problemStatement}</p>
        </div>
      </div>

      <div className="question-page__test-cases-section">
        <h3 className="question-page__section-title">Test Cases</h3>
        <div className="question-page__test-cases-list">
          {visibleTestCases.length > 0 ? (
            visibleTestCases.map((testCase, index) => (
              <div className="question-page__test-case-card" key={testCase.id || index}>
                <div className="question-page__test-case-header">
                  <span className="question-page__test-case-badge">Test Case {index + 1}</span>
                  <span className="question-page__test-case-desc">{testCase.description}</span>
                  <button
                    className="button button-primary"
                    onClick={() => executorRef.current?.runWithInput(testCase.input)}
                    disabled={false}
                  >
                    {'▶ RUN TEST'}
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
                </div>
              </div>
            ))
          ) : (
            <p>No test cases available.</p>
          )}
        </div>
      </div>

      <CodeExecutor ref={executorRef} code={problem.buggyCodes} questionId={problem.id} roundId={problem.roundId} />
    </div>
  );
}
