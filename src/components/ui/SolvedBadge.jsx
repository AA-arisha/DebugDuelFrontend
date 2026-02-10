import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function SolvedBadge({ isSolved, size = 'medium', className = '' }) {
  if (!isSolved) return null;

  const sizeClasses = {
    small: 'text-xs px-2 py-1 gap-1',
    medium: 'text-sm px-3 py-1.5 gap-1.5',
    large: 'text-base px-4 py-2 gap-2',
  };

  const iconSizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5',
  };

  return (
    <div
      className={`inline-flex items-center rounded-full font-bold uppercase tracking-wide ${sizeClasses[size]} ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1))',
        border: '1.5px solid #22c55e',
        color: '#22c55e',
        fontFamily: "'Fira Code', monospace",
        boxShadow: '0 0 15px rgba(34, 197, 94, 0.3)',
        backdropFilter: 'blur(10px)',
      }}
      title="You have solved this question"
    >
      <CheckCircle2 className={iconSizes[size]} />
      <span>Solved</span>
    </div>
  );
}
