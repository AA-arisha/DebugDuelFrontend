import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/common/Loader';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/Badge';
import QuestionsTable from '../components/roundControl/QuestionsTable';
import RoundInfoCard from '../components/roundControl/RoundInfoCard';
import Tabs from '../components/roundControl/Tabs';
import QuestionModal from '../components/roundControl/Modals/QuestionModal';
import ViewQuestionModal from '../components/roundControl/Modals/ViewQuestionModal';
import SubmissionModal from '../components/roundControl/Modals/SubmissionModal';
import Leaderboard from '../components/roundControl/Leaderboard';
import SubmissionsTable from '../components/roundControl/SubmissionsTable';
import { RoundModal } from '../components/rounds/modals/createRounds';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { useRounds } from '../components/rounds/useRounds';
import { getSocket } from '../services/socket';

// new: presentational components + hook
import useRoundDetails from '../hooks/useRoundDetails';
import RoundControlHeader from '../components/roundControl/RoundControlHeader';
import RoundTabsContent from '../components/roundControl/RoundTabsContent';

// Main App Component
export default function RoundControlPanel() {
  const [activeTab, setActiveTab] = useState('questions');
  const [questions, setQuestions] = useState([]);
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [viewingQuestion, setViewingQuestion] = useState(null);
  const [_submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [selectedRoundId, setSelectedRoundId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSavingQuestion, setIsSavingQuestion] = useState(false);
  const [showRoundModal, setShowRoundModal] = useState(false);
  const [roundInfo, setRoundInfo] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  // const [userAttemptsMap, setUserAttemptsMap] = useState({});
  const [submissions, setSubmissions] = useState([]);

  const {
    rounds,
    loading: _roundsLoading,
    actionLoadingById,
    fetchRounds,
    lockRound,
    unlockRound,
    startRound,
    stopRound,
    completeRound,
    createRound,
    deleteRound,
    fetchQuestions,
    createQuestion,
    updateQuestion,
    addTestCase,
    updateTestCase,
    deleteTestCase,
    addBuggyCode,
    updateBuggyCode,
    deleteBuggyCode,
    deleteQuestion,
    fetchRoundDetails: _fetchRoundDetails,
    // admin submissions
    fetchSubmissions,
    fetchSubmissionById: _fetchSubmissionById,
  } = useRounds();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRounds();
  }, [fetchRounds]);

  useEffect(() => {
    if (!selectedRoundId && rounds && rounds.length > 0) {
      const firstRoundId = Number(rounds[0].id); // ensure number
      setSelectedRoundId(firstRoundId);

      if (!params.roundId) {
        navigate(`/admin/roundControl/${firstRoundId}`, { replace: true });
      }
    }
  }, [rounds, selectedRoundId, params.roundId, navigate]);

  // Fetch round details via custom hook
  const {
    roundInfo: fetchedRoundInfo,
    questions: fetchedQuestions,
    leaderboard: fetchedLeaderboard,
    // userAttemptsMap: fetchedUserAttemptsMap,
    loading: detailsLoading,
    error: detailsError,
    refetch: _refetchRoundDetails,
  } = useRoundDetails(params.roundId);

  // ...later cleanup try/catch changed to avoid unused catch param

  useEffect(() => {
    setRoundInfo(fetchedRoundInfo || null);
    setLeaderboardData(fetchedLeaderboard || []);
    // setUserAttemptsMap(fetchedUserAttemptsMap || {});
  }, [fetchedRoundInfo, fetchedLeaderboard]);

  useEffect(() => {
    if (fetchedQuestions) setQuestions(fetchedQuestions);
  }, [fetchedQuestions]);

  useEffect(() => {
    const loadQuestions = async () => {
      if (!selectedRoundId) return;
      const qs = await fetchQuestions(params.roundId);
      setQuestions(qs);
    };
    loadQuestions();
  }, [selectedRoundId, fetchQuestions, params.roundId]);

  // Submissions: load for admin tab
  useEffect(() => {
    const loadSubmissions = async () => {
      if (!selectedRoundId) return;
      if (activeTab !== 'submissions') return;
      try {
        const subs = await fetchSubmissions(selectedRoundId);
        setSubmissions(subs || []);
      } catch (e) {
        console.warn('Failed to load submissions', e);
      }
    };

    loadSubmissions();
  }, [selectedRoundId, activeTab, fetchSubmissions]);

  // Refresh submissions on real-time round updates
  useEffect(() => {
    if (!selectedRoundId) return;
    const socket = getSocket();
    const onRoundUpdate = async () => {
      if (activeTab === 'submissions') {
        try {
          const subs = await fetchSubmissions(selectedRoundId);
          setSubmissions(subs || []);
        } catch (e) {
          console.warn('Failed to refresh submissions on round update', e);
        }
      }
    };

    socket.emit('joinRound', String(selectedRoundId));
    socket.on('round_leaderboard_update', onRoundUpdate);

    return () => {
      socket.off('round_leaderboard_update', onRoundUpdate);
      try {
        socket.emit('leaveRound', String(selectedRoundId));
      } catch {
        /* ignore */
      }
    };
  }, [selectedRoundId, activeTab, fetchSubmissions]);

  const selectedRound = rounds?.find((r) => r.id === params.roundId) || null;

  const handleLockToggle = async () => {
    if (!selectedRound) return;
    setIsProcessing(true);
    try {
      if (selectedRound.status === 'LOCKED') {
        await unlockRound(selectedRound.id);
      } else {
        await lockRound(selectedRound.id);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStart = async () => {
    if (!selectedRound) return;
    setIsProcessing(true);
    try {
      await startRound(selectedRound.id);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStop = async () => {
    if (!selectedRound) return;
    setIsProcessing(true);
    try {
      await stopRound(selectedRound.id);
    } finally {
      setIsProcessing(false);
    }
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmPayload, setConfirmPayload] = useState(null);

  const handleComplete = async () => {
    if (!selectedRound) return;
    // ask confirmation
    setConfirmPayload({
      type: 'complete',
      id: selectedRound.id,
      title: `Complete ${selectedRound.name || 'round'}`,
      description: 'Completing a round is irreversible. Are you sure?',
    });
    setConfirmOpen(true);
  };

  const handleDeleteRound = async () => {
    if (!selectedRound) return;
    setConfirmPayload({
      type: 'delete-round',
      id: selectedRound.id,
      title: `Delete ${selectedRound.name || 'round'}`,
      description: 'This will permanently delete the round and all associated data. Proceed?',
    });
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!confirmPayload) return;
    setConfirmOpen(false);
    setIsProcessing(true);
    try {
      if (confirmPayload.type === 'delete-round') {
        await deleteRound(confirmPayload.id);
        setSelectedRoundId((prev) => {
          const idx = rounds.findIndex((r) => r.id === prev);
          if (idx > 0) return rounds[idx - 1].id;
          if (rounds.length > 1) return rounds[1].id;
          return null;
        });
      }
      if (confirmPayload.type === 'complete') {
        await completeRound(confirmPayload.id);
      }
      if (confirmPayload.type === 'delete-question') {
        await deleteQuestion(confirmPayload.id);
        const qs = await fetchQuestions(selectedRound.id);
        setQuestions(qs);
      }
    } finally {
      setIsProcessing(false);
      setConfirmPayload(null);
    }
  };

  const [editingQuestion, setEditingQuestion] = useState(null);

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setQuestionModalOpen(true);
  };

  const handleEditQuestion = (q) => {
    setEditingQuestion(q);
    setQuestionModalOpen(true);
  };

  const handleSaveQuestion = async (payload) => {
    if (!selectedRound) return;
    setIsSavingQuestion(true);
    try {
      if (editingQuestion && editingQuestion.id) {
        // update title/description
        await updateQuestion(editingQuestion.id, {
          title: payload.title,
          description: payload.problemStatement,
        });

        // --- Sync test cases (create / update / delete) ---
        const existingTCs = editingQuestion.testCases || [];
        const payloadTCs = payload.testCases || [];
        const payloadTCIds = new Set();
        for (const tc of payloadTCs) {
          if (tc.id) {
            payloadTCIds.add(tc.id);
            await updateTestCase(tc.id, {
              input: tc.input,
              expectedOutput: tc.expectedOutput,
              visible: !!tc.visible,
            });
          } else {
            await addTestCase(editingQuestion.id, {
              input: tc.input,
              expectedOutput: tc.expectedOutput,
              visible: !!tc.visible,
            });
          }
        }
        for (const existing of existingTCs) {
          if (existing.id && !payloadTCIds.has(existing.id)) {
            await deleteTestCase(existing.id);
          }
        }

        // --- Sync buggy codes (create / update / delete) ---
        const existingBCs = editingQuestion.buggyCode || editingQuestion.buggyCodes || [];
        const payloadBCs = payload.buggyCodes || [];
        const payloadBCIds = new Set();
        for (const bc of payloadBCs) {
          if (bc.id) {
            payloadBCIds.add(bc.id);
            await updateBuggyCode(bc.id, { language: bc.language, code: bc.code });
          } else {
            await addBuggyCode(editingQuestion.id, { language: bc.language, code: bc.code });
          }
        }
        for (const existing of existingBCs) {
          if (existing.id && !payloadBCIds.has(existing.id)) {
            await deleteBuggyCode(existing.id);
          }
        }
      } else {
        const created = await createQuestion(selectedRound.id, {
          title: payload.title,
          problemStatement: payload.problemStatement,
        });
        if (created && created.id) {
          for (const tc of payload.testCases || []) {
            await addTestCase(created.id, {
              input: tc.input,
              expectedOutput: tc.expectedOutput,
              visible: tc.visible,
            });
          }
          for (const bc of payload.buggyCodes || []) {
            await addBuggyCode(created.id, { language: bc.language, code: bc.code });
          }
        }
      }

      // refresh list
      const qs = await fetchQuestions(selectedRound.id);
      setQuestions(qs);
      setQuestionModalOpen(false);
      setEditingQuestion(null);
    } finally {
      setIsSavingQuestion(false);
    }
  };

  const handleDeleteQuestion = (id) => {
    // open confirm dialog
    setConfirmPayload({
      type: 'delete-question',
      id,
      title: 'Delete question',
      description: 'This will permanently delete the question. Continue?',
    });
    setConfirmOpen(true);
  };

  const tabs = [
    {
      id: 'questions',
      label: 'Questions',
      icon: '📝',
      gradient: 'from-blue-500 to-purple-500',
      activeColor: 'text-blue-400',
    },
    {
      id: 'leaderboard',
      label: 'Leaderboard',
      icon: '🏆',
      gradient: 'from-yellow-500 to-amber-500',
      activeColor: 'text-yellow-400',
    },
    {
      id: 'submissions',
      label: 'Submissions',
      icon: '📤',
      gradient: 'from-blue-500 to-cyan-500',
      activeColor: 'text-cyan-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <RoundControlHeader />

        {/* Round Info Card */}
        {detailsLoading ? (
          <Loader />
        ) : detailsError ? (
          <p className="text-red-400">{detailsError}</p>
        ) : (
          <RoundInfoCard
            round={roundInfo || selectedRound}
            onLockToggle={handleLockToggle}
            onStart={handleStart}
            onStop={handleStop}
            onComplete={handleComplete}
            onDelete={handleDeleteRound}
            isProcessing={isProcessing || !!actionLoadingById?.[selectedRoundId]}
          />
        )}

        {/* Tab Navigation */}
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        <RoundTabsContent
          activeTab={activeTab}
          detailsLoading={detailsLoading}
          detailsError={detailsError}
          questions={questions}
          onAddQuestion={handleAddQuestion}
          onViewQuestion={(q) => setViewingQuestion(q)}
          onEditQuestion={handleEditQuestion}
          onDeleteQuestion={handleDeleteQuestion}
          questionLoadingMap={actionLoadingById}
          // userAttemptsMap={userAttemptsMap}
          disabled={!selectedRound}
          leaderboardData={leaderboardData}
          submissions={submissions}
          onViewSubmission={(sub) => {
            setSelectedSubmission(sub);
            setSubmissionModalOpen(true);
          }}
        />

        {/* Question Modal */}
        <QuestionModal
          key={editingQuestion?.id || 'new'}
          open={questionModalOpen}
          onClose={() => {
            setQuestionModalOpen(false);
            setEditingQuestion(null);
          }}
          onSave={handleSaveQuestion}
          isSaving={isSavingQuestion}
          initialQuestion={editingQuestion}
        />

        {/* View Question Modal */}
        <ViewQuestionModal question={viewingQuestion} onClose={() => setViewingQuestion(null)} />

        {/* Submission Modal */}
        <SubmissionModal
          submission={selectedSubmission}
          onClose={() => setSubmissionModalOpen(false)}
        />

        {/* Round creation modal */}
        <RoundModal
          isOpen={showRoundModal}
          onClose={() => setShowRoundModal(false)}
          onCreateRound={async (payload) => {
            setIsProcessing(true);
            try {
              await createRound(payload);
            } finally {
              setIsProcessing(false);
              setShowRoundModal(false);
            }
          }}
        />

        {/* Confirm dialog */}
        <ConfirmDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          title={confirmPayload?.title}
          description={confirmPayload?.description}
          onConfirm={handleConfirm}
          isPending={isProcessing}
        />
      </div>
    </div>
  );
}
