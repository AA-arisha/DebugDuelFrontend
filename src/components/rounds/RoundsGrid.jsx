import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoundCard } from './RoundCard';
import { useRounds } from './useRounds';

export function RoundsGrid() {
  const navigate = useNavigate();
  const {
    rounds,
    loading,
    actionLoadingById,
    fetchRounds,
    lockRound,
    unlockRound,
    startRound,
    stopRound,
    completeRound,
    deleteRound,
  } = useRounds();

  useEffect(() => {
    fetchRounds();
  }, [fetchRounds]);

  if (loading) return <p className="text-gray-400">Loading rounds...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
      {rounds.map((round) => (
        <RoundCard
          key={round.id}
          round={round}
          onOpen={() => navigate(`/admin/roundControl/${round.id}`)}
          isProcessing={!!actionLoadingById?.[round.id]}
          onLockToggle={() =>
            round.status === 'LOCKED' ? unlockRound(round.id) : lockRound(round.id)
          }
          onStart={() => startRound(round.id)}
          onStop={() => stopRound(round.id)}
          onComplete={() => completeRound(round.id)}
          onDelete={() => deleteRound(round.id)}
        />
      ))}
    </div>
  );
}
