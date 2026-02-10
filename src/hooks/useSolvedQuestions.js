import { useEffect, useState, useCallback } from 'react';
import api from '../services/api';

export default function useSolvedQuestions(userId) {
  const [solvedQuestionIds, setSolvedQuestionIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSolvedQuestions = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await api.get(`/user-progress/solved-questions/${userId}`);
      setSolvedQuestionIds(response.data.solvedQuestionIds || []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch solved questions:', err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchSolvedQuestions();
  }, [fetchSolvedQuestions]);

  // Allow manual refetch (e.g., after successful submission)
  const refetch = useCallback(() => {
    fetchSolvedQuestions();
  }, [fetchSolvedQuestions]);

  return { solvedQuestionIds, loading, error, refetch };
}
