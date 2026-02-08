import { useEffect, useState, useMemo } from 'react';
import { getSocket } from '@/services/socket';

export default function Timer({ roundId, endAt: initialEnd }) {
  // Use a computed value: prefer socket state, fallback to prop
  const [endsAt, setEndsAt] = useState(null);
  const [remainingMs, setRemainingMs] = useState(0);

  const socket = getSocket();
  // Derive the effective end time: use socket state if set, otherwise use prop
  const effectiveEndAt = useMemo(
    () => endsAt || (initialEnd ? new Date(initialEnd) : null),
    [endsAt, initialEnd]
  );

  /* -----------------------------------------
     Socket listeners (authoritative events)
  ------------------------------------------*/
  useEffect(() => {
    const handleStart = (data) => {
      setEndsAt(new Date(data.endsAt));
    };

    const handleStop = () => {
      setEndsAt(null);
      setRemainingMs(0);
    };

    // Join the per-round room so participant timers receive authoritative events
    if (roundId) socket.emit('joinRound', String(roundId));

    socket.on('round_started', handleStart);
    socket.on('round_stopped', handleStop);

    return () => {
      socket.off('round_started', handleStart);
      socket.off('round_stopped', handleStop);
      try {
        if (roundId) socket.emit('leaveRound', String(roundId));
      } catch {
        // ignore
      }
    };
  }, [socket, roundId]);

  /* -----------------------------------------
     Countdown logic (time LEFT only)
  ------------------------------------------*/
  useEffect(() => {
    if (!effectiveEndAt) return;

    const update = () => {
      const now = Date.now();
      const remaining = Math.max(0, effectiveEndAt.getTime() - now);
      setRemainingMs(remaining);
    };

    update(); // instant sync on mount / change
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [effectiveEndAt]);

  /* -----------------------------------------
     Format MM:SS
  ------------------------------------------*/
  const formatTime = (ms) => {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
  };

  // Optional: hide when no active timer
  if (!effectiveEndAt) return null;

  return (
    <div className="max-w-6xl mx-auto mb-4 flex justify-end relative z-10">
      <div
        className="px-6 py-3 rounded-lg backdrop-blur-xl border-2"
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          borderColor: 'rgba(255, 122, 0, 0.3)',
          boxShadow: '0 0 20px rgba(255, 122, 0, 0.2)',
        }}
      >
        <div className="flex items-center gap-3" style={{ width: '230px' }}>
          <span
            className="text-s uppercase tracking-wider"
            style={{
              color: '#b0a7a2',
              fontFamily: "'Fira Code', monospace",
            }}
          >
            Time Left:
          </span>
          <span
            className="text-2xl font-bold"
            style={{
              color: '#ff7a00',
              fontFamily: "'Orbitron', monospace",
              textShadow: '0 0 10px rgba(255, 122, 0, 0.5)',
            }}
          >
            {formatTime(remainingMs)}
          </span>
        </div>
      </div>
    </div>
  );
}
