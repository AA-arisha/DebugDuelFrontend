import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useEffect, useState } from 'react';
import CodeExecutor from '../components/CodeExecutor';
import '../styles/QuestionPage.css';

export default function QuestionPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await api.get(`/problems/${id}`);
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

  const visibleTestCases = problem.testcases?.filter((tc) => !tc.isHidden) || [];

  return (
    <div className="question-page">
      <div className="question-page__back-link">
        <Link to="/universes" className="brand">
          ← Back to universes
        </Link>
      </div>

      <div className="question-page__problem-section">
        <h3 className="question-page__section-title">Problem: {problem.title}</h3>
        <div className="question-page__problem-statement">
          <p>{problem.description}</p>
        </div>
      </div>

      <div className="question-page__test-cases-section">
        <h3 className="question-page__section-title">Test Cases</h3>
        <div className="question-page__test-cases-list">
          {visibleTestCases.length > 0 ? (
            visibleTestCases.map((testCase, index) => (
              <div className="question-page__test-case-card" key={index}>
                <div className="question-page__test-case-header">
                  <span className="question-page__test-case-badge">Test Case {index + 1}</span>
                  <span className="question-page__test-case-desc">{testCase.description}</span>
                </div>
                <div className="question-page__test-case-content">
                  <div className="question-page__test-case-item">
                    <label className="question-page__test-label">Input:</label>
                    <code className="question-page__test-code">{testCase.input}</code>
                  </div>
                  <div className="question-page__test-case-item">
                    <label className="question-page__test-label">Expected Output:</label>
                    <code className="question-page__test-code">{testCase.expected}</code>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No test cases available.</p>
          )}
        </div>
      </div>

      <CodeExecutor code={problem.buggyCodes} problemId={problem.id} />
    </div>
  );
}
