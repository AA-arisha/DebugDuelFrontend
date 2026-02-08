import { useEffect, useState } from 'react';
import { getSocket } from '@/services/socket';

export default function Timer({ roundId, startAt: initialStart, endAt: initialEnd }) {
  const [startTime, setStartTime] = useState(initialStart ? new Date(initialStart) : null);
  const [endsAt, setEndsAt] = useState(initialEnd ? new Date(initialEnd) : null);
  const [remainingMs, setRemainingMs] = useState(0);
  const socket = getSocket();

  // Listen for server events
  useEffect(() => {
    const handleStart = (data) => {
      if (data.id !== roundId) return;
      setStartTime(new Date(data.startTime));
      setEndsAt(new Date(data.endsAt));
    };

    const handleStop = (data) => {
      if (data.id !== roundId) return;
      setEndsAt(new Date(data.endsAt));
      setRemainingMs(0);
    };

    // join per-round room so this timer receives authoritative events for the round
    socket.emit('joinRound', String(roundId));

    socket.on('round_started', handleStart);
    socket.on('round_stopped', handleStop);

    return () => {
      socket.off('round_started', handleStart);
      socket.off('round_stopped', handleStop);
      try {
        socket.emit('leaveRound', String(roundId));
      } catch {
        // ignore
      }
    };
  }, [socket, roundId]);

  // Local interval for smooth countdown
  useEffect(() => {
    if (!startTime || !endsAt) return;

    const update = () => {
      const now = Date.now();
      const remaining = Math.max(0, endsAt.getTime() - now);
      setRemainingMs(remaining);
    };

    update(); // initial call
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startTime, endsAt]);

  const totalMs = startTime && endsAt ? endsAt.getTime() - startTime.getTime() : 0;
  const sec = Math.floor(remainingMs / 1000);
  const min = Math.floor(sec / 60);
  const s = sec % 60;
  const progressPercent = totalMs
    ? Math.max(0, Math.min(100, ((totalMs - remainingMs) / totalMs) * 100))
    : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-amber-400 font-semibold">
        <span>{`${min}:${s.toString().padStart(2, '0')}`}</span>
        <span>{remainingMs > 0 ? `${min} min left` : '0 min left'}</span>
      </div>

      <div className="h-2 bg-black/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 transition-all duration-500 ease-linear"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
