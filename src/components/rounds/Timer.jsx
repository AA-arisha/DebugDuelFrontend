import { useEffect, useState } from 'react';

export default function Timer({ startTime, duration, onComplete }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!startTime || !duration) return;

    const start = new Date(startTime).getTime();
    const maxDuration = duration * 60 * 1000; // minutes → ms

    const updateElapsed = () => {
      const now = Date.now();
      const elapsedTime = now - start;
      setElapsed(Math.min(elapsedTime, maxDuration));
    };

    // initial sync
    updateElapsed();

    const interval = setInterval(updateElapsed, 1000);

    const remainingMs = maxDuration - (Date.now() - start);

    const timeout = setTimeout(() => {
      setElapsed(maxDuration);
      onComplete?.();
      clearInterval(interval);
    }, Math.max(remainingMs, 0));

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [startTime, duration, onComplete]);

  // helpers
  const elapsedMin = Math.floor(elapsed / 60000);
  const remainingMin = Math.max(0, duration - elapsedMin);
  const progress = Math.min((elapsed / (duration * 60 * 1000)) * 100, 100);

  const formatTime = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-2">
      {/* Time labels */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-amber-400 font-semibold">
          {formatTime(elapsed)} / {duration}:00
        </span>
        <span className="text-amber-300/70">{remainingMin} min left</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-black/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
