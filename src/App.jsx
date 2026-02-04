import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Page imports
import HomePage from './pages/HomePage';
import LoginForm from './pages/LoginForm';
import { BattleRounds, QuestionsPage } from './pages/index';
import RoundControlPanel from './pages/RoundControlPanel';
import Dashboard from './pages/Dashboard';
import { Rounds } from './pages/Rounds';
// import RoundDetails from "./pages/RoundDetails";
import TeamsListPage from './pages/TeamsListPage';
// Layout and authentication imports
import AdminLayout from './layouts/AdminLayout';
import ParticipantLayout from './layouts/ParticipantLayout';
import ProtectedRoute from './components/ProtectedRoute';
import QuestionDetailPage from './pages/participant/QuestionDetailPage';

const App = () => {
  return (
    <Routes>
      {/* ========== PARTICIPANT ROUTES ========== */}
      {/* All participant routes wrapped with ParticipantLayout */}
      <Route element={<ParticipantLayout />}>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Protected participant routes */}
        <Route
          path="/battleRounds"
          element={
            <ProtectedRoute>
              <BattleRounds />
            </ProtectedRoute>
          }
        />
        <Route
          path="/question/:id"
          element={
            <ProtectedRoute>
              <QuestionDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions"
          element={
            <ProtectedRoute>
              <QuestionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions/:roundId"
          element={
            <ProtectedRoute>
              <QuestionsPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ========== ADMIN ROUTES ========== */}
      {/* All admin routes wrapped with AdminLayout and protected */}
      <Route
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/teams" element={<TeamsListPage />} />
        <Route path="/admin/rounds" element={<Rounds />} />
        {/* <Route path="/admin/roundDetails" element={<RoundDetails />} /> */}
        {/* <Route path="/admin/roundControl" element={ <RoundControlPanel/>} /> */}
        <Route path="/admin/roundControl/:roundId" element={<RoundControlPanel />} />
        {/* <Route path="/admin/rounds/:roundId" element={<RoundDetails />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
