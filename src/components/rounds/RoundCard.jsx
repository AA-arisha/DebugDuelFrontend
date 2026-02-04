import Timer from './Timer';
import { Lock, Unlock, Trash, Play, Square, Clock, Scale } from 'lucide-react';
import { useState } from 'react';

export function RoundCard({ round, onOpen, onLockToggle, onStart, onStop, isProcessing = false }) {
  const { roundNumber, name, duration, status, weight, startTime, endsAt } = round;
  const [isHovered, setIsHovered] = useState(false);
  const isLocked = status === 'LOCKED';
  const isActive = status === 'ACTIVE';
  const isCompleted = status === 'COMPLETED';

  const statusConfig = {
    ACTIVE: {
      gradient: 'from-amber-500/20 via-orange-500/20 to-amber-500/20',
      border: 'border-amber-500/40',
      text: 'text-amber-400',
      glow: 'shadow-amber-500/20',
      badge: 'from-amber-500 to-orange-500',
      badgeShadow: 'shadow-lg shadow-amber-500/50',
    },
    COMPLETED: {
      gradient: 'from-emerald-500/10 via-green-500/10 to-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      glow: 'shadow-emerald-500/15',
      badge: 'from-emerald-500 to-green-600',
      badgeShadow: 'shadow-lg shadow-emerald-500/40',
    },
    LOCKED: {
      gradient: 'from-slate-500/5 via-slate-600/5 to-slate-500/5',
      border: 'border-slate-700/40',
      text: 'text-slate-400',
      glow: 'shadow-slate-500/10',
      badge: 'from-slate-600 to-slate-700',
      badgeShadow: 'shadow-md shadow-slate-500/20',
    },
  };

  const config = statusConfig[status] || statusConfig.LOCKED;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (onOpen) onOpen(round);
      }}
      className={`
        group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 cursor-pointer
        ${config.border}
        ${isHovered ? `${config.glow} shadow-2xl scale-[1.02]` : 'shadow-lg'}
      `}
      style={{
        background: 'linear-gradient(145deg, #0a0a0f 0%, #151519 50%, #0a0a0f 100%)',
      }}
    >
      {/* Animated background gradient */}
      <div
        className={`
        absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 
        group-hover:opacity-100 transition-opacity duration-700
      `}
      />

      {/* Animated border glow */}
      <div
        className={`
        absolute inset-0 rounded-2xl bg-gradient-to-r ${config.badge} opacity-0
        group-hover:opacity-20 blur-xl transition-opacity duration-500
      `}
      />

      {/* Floating particles effect for active rounds */}
      {isActive && (
        <>
          <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <div className="absolute top-8 right-8 w-1 h-1 rounded-full bg-orange-400 animate-pulse" />
          <div
            className="absolute top-6 right-12 w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping"
            style={{ animationDelay: '0.5s' }}
          />
        </>
      )}

      <div className="relative p-7">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              {/* Round number badge */}
              <div
                className={`
                relative flex items-center justify-center w-10 h-10 rounded-xl
                bg-gradient-to-br ${config.badge} ${config.badgeShadow}
                transform transition-transform duration-300
                ${isHovered ? 'scale-110 rotate-3' : 'scale-100'}
              `}
              >
                <span className="text-base font-bold text-white">R{roundNumber}</span>
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-white tracking-tight truncate">{name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive
                        ? 'bg-amber-400 animate-pulse'
                        : isCompleted
                        ? 'bg-emerald-400'
                        : 'bg-slate-500'
                    }`}
                  />
                  <span className="text-xs text-slate-400 uppercase tracking-wide">
                    {isActive ? 'In Progress' : isCompleted ? 'Finished' : 'Ready'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status badge */}
          <span
            className={`
            px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider
            bg-gradient-to-r ${config.badge} text-white ${config.badgeShadow}
            transform transition-all duration-300
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}
          >
            {status}
          </span>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="group/card relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-4 hover:border-slate-600/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
            <div className="relative flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium mb-0.5">Duration</p>
                <p className="text-lg font-bold text-white">
                  {duration}
                  <span className="text-sm text-slate-400 ml-1">min</span>
                </p>
              </div>
            </div>
          </div>

          <div className="group/card relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-4 hover:border-slate-600/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
            <div className="relative flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Scale className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium mb-0.5">Weight</p>
                <p className="text-lg font-bold text-white">
                  {weight}
                  <span className="text-sm text-slate-400 ml-1">%</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Time Info */}
        {(startTime || endsAt) && (
          <div className="mb-5 p-4 rounded-xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/40 backdrop-blur-sm">
            <div className="space-y-2.5">
              {startTime && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400 font-medium">Started</span>
                  <span className="text-sm text-white font-semibold">
                    {new Date(startTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              )}
              {endsAt && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400 font-medium">Ends</span>
                  <span className="text-sm text-white font-semibold">
                    {new Date(endsAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Active Timer */}
        {isActive && (
          <div className="mb-5 p-5 rounded-xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-500/10 border-2 border-amber-500/30 backdrop-blur-sm">
            <Timer startTime={startTime} duration={duration} onComplete={onStop} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLockToggle && onLockToggle();
            }}
            disabled={isActive || isCompleted || isProcessing}
            className={`
              group/btn relative flex items-center gap-2.5 px-5 py-3 text-sm font-semibold rounded-xl
              transition-all duration-300 overflow-hidden
              ${
                isLocked
                  ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-500/30'
                  : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
              }
              ${
                isActive || isCompleted || isProcessing
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:scale-105 hover:shadow-xl active:scale-95'
              }
            `}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            <div className="relative flex items-center gap-2.5">
              {isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              {isLocked ? 'Unlock' : 'Lock'}
            </div>
          </button>

          {!isActive && !isCompleted && (
            <button
              onClick={onStart}
              disabled={isActive || isCompleted || isProcessing}
              className="group/btn relative flex items-center gap-2.5 px-5 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-lg shadow-amber-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/40 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
              <div className="relative flex items-center gap-2.5">
                <Play className="w-4 h-4 fill-current" />
                Start Round
              </div>
            </button>
          )}

          {isActive && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStop && onStop();
              }}
              disabled={!isActive || isProcessing}
              className="group/btn relative flex items-center gap-2.5 px-5 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/40 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
              <div className="relative flex items-center gap-2.5">
                <Square className="w-4 h-4 fill-current" />
                Stop Round
              </div>
            </button>
          )}

          {/* Complete button (available when not completed) */}
          {/* {!isCompleted && (
            <button
              onClick={(e) => { e.stopPropagation(); onComplete && onComplete(); }}
              disabled={isCompleted || isProcessing}
              className="group/btn relative flex items-center gap-2.5 px-5 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              <div className="relative flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-sm bg-white/20" />
                Complete Round
              </div>
            </button>
          )} */}

          {/* <button 
            onClick={(e) => { e.stopPropagation(); onDelete && onDelete(); }} 
            disabled={isProcessing}
            className="group/btn relative flex items-center gap-2.5 px-5 py-3 text-sm font-semibold rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border-2 border-slate-700/50 hover:border-red-500/50 text-slate-300 hover:text-red-400 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-500/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            <div className="relative flex items-center gap-2.5">
              <Trash className="w-4 h-4" />
              Delete
            </div>
          </button> */}
        </div>
      </div>
    </div>
  );
}
