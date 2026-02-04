import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { getSocket } from '../services/socket';
import { useAuth } from '../context/useAuth';

export default function useRoundDetails(roundId) {
  const { user } = useAuth();
  const userId = user?.userId || user?.id || null;

  const [roundInfo, setRoundInfo] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [competitionLeaderboard, setCompetitionLeaderboard] = useState([]);
  const [userAttemptsMap, setUserAttemptsMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const transformLeaderboard = (entries = []) => {
    return entries.map((entry, i) => ({
      rank: entry.rank ?? i + 1,
      teamName: entry.teamName ?? entry.userName ?? entry.name ?? `User ${entry.userId ?? i + 1}`,
      score: entry.score ?? entry.points ?? 0,
      timePenalty: entry.timePenalty ?? entry.penalty ?? 0,
      userId: entry.userId ?? entry.id ?? null,
      correctCount: entry.correctCount ?? entry.correct ?? 0,
      wrongCount: entry.wrongCount ?? entry.wrong ?? 0,
      submissions: entry.submissions ?? [],
    }));
  };

  const fetchQuestions = useCallback(async () => {
    if (!roundId) return [];
    try {
      const res = await api.get(`/rounds/${roundId}/questions`);
      const data = res.data;
      const qs = data.questions || data || [];
      setQuestions(qs);
      return qs;
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to load questions');
      return [];
    }
  }, [roundId]);

  const fetchRoundLeaderboard = useCallback(async () => {
    if (!roundId) return [];
    try {
      const res = await api.get(`/rounds/${roundId}/leaderboard`);
      const data = res.data || [];
      const mapped = transformLeaderboard(Array.isArray(data) ? data : data.entries || []);
      setLeaderboard(mapped);
      return mapped;
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to load leaderboard');
      return [];
    }
  }, [roundId]);

  const fetchCompetitionLeaderboard = useCallback(async (competitionId) => {
    if (!competitionId) return [];
    try {
      const res = await api.get(`/competitions/${competitionId}/leaderboard`);
      const data = res.data || [];
      const mapped = transformLeaderboard(Array.isArray(data) ? data : data.entries || []);
      setCompetitionLeaderboard(mapped);
      return mapped;
    } catch (err) {
      // not critical; competition leaderboard may not be available
      console.warn('Failed to load competition leaderboard', err?.message || err);
      return [];
    }
  }, []);

  const fetchAll = useCallback(async () => {
    if (!roundId) {
      setRoundInfo(null);
      setQuestions([]);
      setLeaderboard([]);
      setUserAttemptsMap({});
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Round info
      const resRound = await api.get(`/rounds/${roundId}`);
      const round = resRound.data?.round || resRound.data || null;
      setRoundInfo(round);

      // Questions
      await fetchQuestions();

      // Leaderboard
      await fetchRoundLeaderboard();

      // Competition leaderboard (if associated)
      const competitionId = round?.competitionId ?? round?.competition?.id;
      if (competitionId) await fetchCompetitionLeaderboard(competitionId);

      // user attempts: try to fetch an endpoint or derive from round data
      const attemptsRes = resRound.data?.userAttempts || resRound.data?.attempts || null;
      const attemptsMap = {};

      if (attemptsRes) {
        // attemptsRes could be { userId: { questionId: { attempts, solved } } }
        if (attemptsRes[userId]) {
          Object.entries(attemptsRes[userId]).forEach(([qId, att]) => {
            attemptsMap[qId] = { attempts: att.attempts ?? 0, solved: !!att.solved };
          });
        } else {
          // fallback: iterate values
          Object.values(attemptsRes).forEach((perUser) => {
            Object.entries(perUser || {}).forEach(([qId, att]) => {
              attemptsMap[qId] = { attempts: att.attempts ?? 0, solved: !!att.solved };
            });
          });
        }
      }

      setUserAttemptsMap(attemptsMap);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to load round details');
    } finally {
      setLoading(false);
    }
  }, [roundId, userId, fetchQuestions, fetchRoundLeaderboard, fetchCompetitionLeaderboard]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Socket.IO: subscribe to round and competition updates
  useEffect(() => {
    if (!roundId) return;
    const socket = getSocket();

    const onRoundUpdate = (payload) => {
      // payload expected to be leaderboard entries
      const mapped = transformLeaderboard(payload || []);
      setLeaderboard(mapped);
    };

    const onCompetitionUpdate = (payload) => {
      const mapped = transformLeaderboard(payload || []);
      setCompetitionLeaderboard(mapped);
    };

    socket.emit('joinRound', { roundId });
    socket.on('round_leaderboard_update', onRoundUpdate);

    // If there is a competition associated, also join
    if (roundInfo?.competitionId) {
      socket.emit('joinCompetition');
      socket.on('competition_leaderboard_update', onCompetitionUpdate);
    }

    return () => {
      socket.off('round_leaderboard_update', onRoundUpdate);
      socket.off('competition_leaderboard_update', onCompetitionUpdate);
      // optionally leave rooms - not required by server spec but allowed
      try {
        socket.emit('leaveRound', { roundId });
      } catch {
        // ignore
      }
    };
  }, [roundId, roundInfo]);

  return {
    roundInfo,
    questions,
    leaderboard,
    competitionLeaderboard,
    userAttemptsMap,
    loading,
    error,
    refetch: fetchAll,
    refetchLeaderboard: fetchRoundLeaderboard,
  };
}
