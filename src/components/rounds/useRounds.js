import { useState, useCallback } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { getSocket } from '@/services/socket';
import { useEffect } from 'react';
export const useRounds = () => {
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const socket = getSocket();
    socket.emit('joinCompetition');
    const handleUpdate = (updatedRound) => {
      setRounds((prev) =>
        prev.map((r) => (r.id?.toString() === updatedRound.id?.toString() ? updatedRound : r))
      );
    };

    socket.on('round_updated', handleUpdate);
    socket.on('round_started', handleUpdate);
    socket.on('round_stopped', handleUpdate);

    return () => {
      socket.off('round_updated', handleUpdate);
      socket.off('round_started', handleUpdate);
      socket.off('round_stopped', handleUpdate);
    };
  }, []);
  // per-item loading map: { [id]: boolean }
  const [actionLoadingById, setActionLoadingById] = useState({});

  const setItemLoading = useCallback((id, value) => {
    setActionLoadingById((prev) => ({ ...prev, [id]: value }));
  }, []);

  const fetchRounds = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/rounds');
      setRounds(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch rounds');
    } finally {
      setLoading(false);
    }
  }, []);

  const createRound = useCallback(
    async (payload) => {
      setActionLoading(true);
      try {
        await api.post('/admin/rounds', payload);
        await fetchRounds();
        toast.success('Round created successfully');
      } catch (err) {
        console.error(err);
        toast.error('Failed to create round');
      } finally {
        setActionLoading(false);
      }
    },
    [fetchRounds]
  );

  const lockRound = useCallback(
    async (id) => {
      setItemLoading(id, true);
      try {
        await api.put(`/admin/rounds/${id}/lock`);
        toast.success('Round locked');
      } catch (err) {
        console.error(err);
        toast.error('Failed to lock round');
      } finally {
        setItemLoading(id, false);
      }
    },
    [setItemLoading]
  );

  const unlockRound = useCallback(
    async (id) => {
      setItemLoading(id, true);
      try {
        await api.put(`/admin/rounds/${id}/unlock`);
        toast.success('Round unlocked');
      } catch (err) {
        console.error(err);
        toast.error('Failed to unlock round');
      } finally {
        setItemLoading(id, false);
      }
    },
    [setItemLoading]
  );

  const startRound = useCallback(
    async (id) => {
      setItemLoading(id, true);
      try {
        await api.put(`/admin/rounds/${id}/start`);
        toast.success('Round started');
      } catch (err) {
        console.error(err);
        toast.error('Failed to start round');
      } finally {
        setItemLoading(id, false);
      }
    },
    [setItemLoading]
  );

  const stopRound = useCallback(
    async (id) => {
      setItemLoading(id, true);
      try {
        await api.put(`/admin/rounds/${id}/stop`);
        toast.success('Round stopped');
      } catch (err) {
        console.error(err);
        toast.error('Failed to stop round');
      } finally {
        setItemLoading(id, false);
      }
    },
    [setItemLoading]
  );

  const deleteRound = useCallback(
    async (id) => {
      setItemLoading(id, true);
      try {
        await api.delete(`/admin/rounds/${id}`);
        toast.success('Round deleted');
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete round');
      } finally {
        setItemLoading(id, false);
      }
    },
    [setItemLoading]
  );

  // Questions
  const fetchQuestions = useCallback(async (roundId) => {
    try {
      const res = await api.get(`/admin/${roundId}/questions`);
      return res.data || [];
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch questions');
      return [];
    }
  }, []);

  const createQuestion = useCallback(async (roundId, payload) => {
    setActionLoading(true);
    try {
      const res = await api.post(`/admin/${roundId}/questions`, payload);
      toast.success('Question created');
      return res.data;
    } catch (err) {
      console.error(err);
      toast.error('Failed to create question');
    } finally {
      setActionLoading(false);
    }
  }, []);

  const updateQuestion = useCallback(async (id, payload) => {
    try {
      const res = await api.put(`/admin/questions/${id}`, payload);
      toast.success('Question updated');
      return res.data;
    } catch (err) {
      console.error(err);
      toast.error('Failed to update question');
    }
  }, []);

  const deleteQuestion = useCallback(
    async (id) => {
      setItemLoading(id, true);
      try {
        await api.delete(`/admin/questions/${id}`);
        toast.success('Question deleted');
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete question');
      } finally {
        setItemLoading(id, false);
      }
    },
    [setItemLoading]
  );

  // Test Cases
  const addTestCase = useCallback(async (questionId, payload) => {
    setActionLoading(true);
    try {
      const res = await api.post(`/admin/${questionId}/testcases`, payload);
      toast.success('Test case added');
      return res.data;
    } catch (err) {
      console.error(err);
      toast.error('Failed to add test case');
    } finally {
      setActionLoading(false);
    }
  }, []);

  const updateTestCase = useCallback(async (id, payload) => {
    try {
      const res = await api.put(`/admin/testcases/${id}`, payload);
      toast.success('Test case updated');
      return res.data;
    } catch (err) {
      console.error(err);
      toast.error('Failed to update test case');
    }
  }, []);

  const deleteTestCase = useCallback(async (id) => {
    try {
      await api.delete(`/admin/testcases/${id}`);
      toast.success('Test case deleted');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete test case');
    }
  }, []);

  // Buggy Codes
  const addBuggyCode = useCallback(async (questionId, payload) => {
    setActionLoading(true);
    try {
      const res = await api.post(`/admin/${questionId}/buggycodes`, payload);
      toast.success('Buggy code added');
      return res.data;
    } catch (err) {
      console.error(err);
      toast.error('Failed to add buggy code');
    } finally {
      setActionLoading(false);
    }
  }, []);

  const updateBuggyCode = useCallback(async (id, payload) => {
    try {
      const res = await api.put(`/admin/buggycodes/${id}`, payload);
      toast.success('Buggy code updated');
      return res.data;
    } catch (err) {
      console.error(err);
      toast.error('Failed to update buggy code');
    }
  }, []);

  const deleteBuggyCode = useCallback(async (id) => {
    try {
      await api.delete(`/admin/buggycodes/${id}`);
      toast.success('Buggy code deleted');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete buggy code');
    }
  }, []);

  // Fetch full round details
  const fetchRoundDetails = useCallback(async (roundId) => {
    if (!roundId) {
      console.warn('fetchRoundDetails called without roundId');
      return;
    }

    try {
      const res = await api.get(`/rounds/${roundId}`);
      return res.data;
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error('Failed to fetch round details');
      throw err;
    }
  }, []);

  return {
    rounds,
    loading,
    fetchRounds,
    lockRound,
    unlockRound,
    startRound,
    stopRound,
    createRound,
    deleteRound,
    // questions
    fetchQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    // testcases
    addTestCase,
    updateTestCase,
    deleteTestCase,
    // buggy codes
    addBuggyCode,
    updateBuggyCode,
    deleteBuggyCode,
    // loading state for actions
    actionLoading,
    // per-item loading map and helper
    actionLoadingById,
    isActionLoading: (id) => !!actionLoadingById[id],
    // round details
    fetchRoundDetails,
  };
};
