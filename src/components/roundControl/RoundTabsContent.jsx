import React from 'react';
import Loader from '../common/Loader';
import QuestionsTable from './QuestionsTable';
import Leaderboard from './Leaderboard';
import SubmissionsTable from './SubmissionsTable';

export default function RoundTabsContent({
  activeTab,
  detailsLoading,
  detailsError,
  questions,
  onAddQuestion,
  onViewQuestion,
  onEditQuestion,
  onDeleteQuestion,
  questionLoadingMap,
  userAttemptsMap,
  disabled,
  leaderboardData,
  submissions,
  onViewSubmission,
}) {
  return (
    <div className="pt-4">
      {activeTab === 'questions' &&
        (detailsLoading ? (
          <Loader />
        ) : detailsError ? (
          <p className="text-red-400">{detailsError}</p>
        ) : (
          <QuestionsTable
            questions={questions}
            onAddQuestion={onAddQuestion}
            onViewQuestion={onViewQuestion}
            onEditQuestion={onEditQuestion}
            onDeleteQuestion={onDeleteQuestion}
            questionLoadingMap={questionLoadingMap}
            userAttemptsMap={userAttemptsMap}
            disabled={disabled}
          />
        ))}

      {activeTab === 'leaderboard' && <Leaderboard leaderboard={leaderboardData} />}

      {activeTab === 'submissions' && (
        <SubmissionsTable submissions={submissions} onViewSubmission={onViewSubmission} />
      )}
    </div>
  );
}
