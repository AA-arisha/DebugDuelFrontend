import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/Badge';

export default function RoundInfoCard({ round, onLockToggle, onStart, onStop, isProcessing }) {
  const status = round?.status || 'LOCKED';
  const getStatusConfig = (s) => {
    switch (s) {
      case 'LOCKED':
        return {
          color: 'from-red-500/20 to-pink-500/20',
          text: 'text-red-400',
          border: 'border-red-500/40',
          icon: '🔒',
        };
      case 'ACTIVE':
        return {
          color: 'from-green-500/20 to-emerald-500/20',
          text: 'text-green-400',
          border: 'border-green-500/40',
          icon: '🟢',
        };
      case 'COMPLETED':
        return {
          color: 'from-blue-500/20 to-cyan-500/20',
          text: 'text-blue-400',
          border: 'border-blue-500/40',
          icon: '✅',
        };
      default:
        return {
          color: 'from-gray-500/20 to-slate-500/20',
          text: 'text-gray-400',
          border: 'border-gray-500/40',
          icon: '⏸️',
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div
      className={`bg-gradient-to-br ${statusConfig.color} p-6 rounded-xl shadow-2xl border-2 ${
        status === 'ACTIVE' ? 'border-green-500/30' : 'border-red-500/30'
      }`}
    >
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Round Control</h2>
        <Badge className={`px-4 py-2 rounded-lg font-bold ${statusConfig.text}`}>
          {statusConfig.icon} {status}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border-2 border-blue-500/20">
          <p className="text-xs font-bold text-blue-400 mb-2">📊 ROUND NAME</p>
          <p className="text-xl font-bold">{round?.name || 'N/A'}</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-xl border-2 border-orange-500/20">
          <p className="text-xs font-bold text-orange-400 mb-2">⏱️ DURATION</p>
          <p className="text-xl font-bold">{round?.duration || '0'} min</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border-2 border-blue-500/20">
          <p className="text-xs font-bold text-blue-400 mb-2">📅 START TIME</p>
          <p className="text-base font-bold">
            {round?.startTime ? new Date(round.startTime).toLocaleString() : '—'}
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        {/* <Button onClick={onEdit} disabled={isProcessing} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg">✏️ Edit Round</Button> */}
        <Button
          onClick={onLockToggle}
          disabled={isProcessing}
          className={`bg-gradient-to-r ${
            status === 'LOCKED'
              ? 'from-green-500/20 to-emerald-500/20 text-green-400'
              : 'from-red-500/20 to-pink-500/20 text-red-400'
          } border-2 ${
            status === 'LOCKED' ? 'border-green-500/40' : 'border-red-500/40'
          } font-bold px-6 py-3 rounded-lg shadow-lg`}
        >
          {status === 'LOCKED' ? '🔓 Unlock' : '🔒 Lock'} Round
        </Button>
        {status !== 'ACTIVE' && status !== 'COMPLETED' && (
          <Button
            onClick={onStart}
            disabled={isProcessing}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-6 py-3 rounded-lg"
          >
            ▶️ Start
          </Button>
        )}
        {status === 'ACTIVE' && (
          <Button
            onClick={onStop}
            disabled={isProcessing}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold px-6 py-3 rounded-lg"
          >
            ⏹ Stop
          </Button>
        )}
        {/* {status !== 'COMPLETED' && (
          <Button onClick={onComplete} disabled={isProcessing} className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold px-6 py-3 rounded-lg">✅ Complete</Button>
        )} */}
        {/* <Button onClick={onDelete} disabled={isProcessing} className="bg-gray-800 border-2 border-gray-700 text-white font-bold px-6 py-3 rounded-lg">🗑️ Delete</Button> */}
      </div>
    </div>
  );
}
