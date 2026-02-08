import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function QuestionCard({ question, isClickable, onClick, getStatusColor }) {
  return (
    <div
      key={question.id}
      className="relative group cursor-pointer"
      style={{
        opacity: question.status === 'LOCKED' ? 0.6 : 1,
        pointerEvents: isClickable ? 'auto' : 'none',
      }}
      onClick={() => onClick && onClick(question)}
    >
      <div
        className="absolute -inset-1 rounded-lg opacity-20 group-hover:opacity-40 blur-md transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${getStatusColor(question.status)}, ${getStatusColor(
            question.status
          )})`,
        }}
      ></div>

      <div
        className="relative backdrop-blur-xl rounded-lg overflow-hidden border-2 transition-all duration-300 transform group-hover:scale-102 group-hover:shadow-xl"
        style={{
          background: 'linear-gradient(180deg, rgba(122, 63, 42, 0.12), rgba(0, 0, 0, 0.4))',
          borderColor: isClickable ? getStatusColor(question.status) : 'rgba(255, 122, 0, 0.2)',
          boxShadow: `0 0 20px ${
            isClickable ? `${getStatusColor(question.status)}35` : 'rgba(255, 122, 0, 0.2)'
          }`,
          minHeight: '160px',
        }}
      >
        <div className="p-5 flex flex-col h-full justify-between">
          <div>
            <h3
              className="text-base font-bold mb-3 leading-tight"
              style={{
                color: '#ff7a00',
                fontFamily: "'Fira Code', monospace",
                textShadow: '0 0 8px rgba(255, 122, 0, 0.3)',
              }}
            >
              {question.title}
            </h3>
          </div>

          <div
            className="flex items-center justify-between mt-4 pt-4 border-t"
            style={{ borderColor: 'rgba(255, 122, 0, 0.2)' }}
          >
            <div className="flex items-center gap-3">
              {question.attempts > 0 && (
                <div
                  className="text-xs"
                  style={{ color: '#7a3f2a', fontFamily: "'Fira Code', monospace" }}
                >
                  Attempts: {question.attempts}
                </div>
              )}
            </div>

            {isClickable && (
              <ChevronRight
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: '#ff7a00' }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
