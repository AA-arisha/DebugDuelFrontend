import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { RoundsGrid } from '@/components/rounds/RoundsGrid';
import { RoundModal } from '@/components/rounds/modals/createRounds';
import { useRounds } from '@/components/rounds/useRounds';

export function Rounds() {
  const [showForm, setShowForm] = useState(false);
  const { fetchRounds, createRound } = useRounds();

  // ✅ Only run once on mount
  useEffect(() => {
    fetchRounds();
  }, [fetchRounds]); // fetchRounds is memoized, so safe here

  return (
    <div className="min-h-screen p-8 bg-[#050406]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Rounds Management</h2>
          <p className="text-gray-400">Manage tournament rounds and schedules</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-[#ff7a00] hover:bg-[#ff9933] text-white flex items-center px-4 py-2 rounded"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Round
        </button>
      </div>

      {/* Grid */}
      <RoundsGrid />

      {/* Modal */}
      <RoundModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onCreateRound={createRound}
      />
    </div>
  );
}
