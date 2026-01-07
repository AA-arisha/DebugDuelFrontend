import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useEffect, useState } from 'react';
import CodeExecutor from '../components/CodeExecutor';
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
  console.log(visibleTestCases);
  console.log(problem.buggyCodes);

  return (
    <div className="question-wrap">
      <div style={{ marginBottom: '24px' }}>
        <Link to="/" className="brand">
          ← Back to universes
        </Link>
      </div>

      <div className="problem-section">
        <h3 className="section-title">Problem: {problem.title}</h3>
        <div className="problem-statement">
          <p>{problem.description}</p>
        </div>
      </div>

      <div className="test-cases-section">
        <h3 className="section-title">Test Cases</h3>
        <div className="test-cases-list">
          {visibleTestCases.length > 0 ? (
            visibleTestCases.map((testCase, index) => (
              <div className="test-case-card" key={index}>
                <div className="test-case-header">
                  <span className="test-case-badge">Test Case {index + 1}</span>
                  <span className="test-case-desc">{testCase.description}</span>
                </div>
                <div className="test-case-content">
                  <div className="test-case-item">
                    <label className="test-label">Input:</label>
                    <code className="test-code">{testCase.input}</code>
                  </div>
                  <div className="test-case-item">
                    <label className="test-label">Expected Output:</label>
                    <code className="test-code">{testCase.expected}</code>
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
