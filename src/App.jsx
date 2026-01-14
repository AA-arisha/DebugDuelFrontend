import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { HomePage, LoginForm, BattleRounds, QuestionPage } from './pages/index';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const location = useLocation();

  return (
    <div className="app-shell">
      <main className="app-main">
        <div key={location.pathname} className="route-container route-swizzle">
          <div className="parallax-shards" aria-hidden="true">
            <span className="shard" style={{ left: '8%', top: '12%' }} />
            <span className="shard" style={{ left: '88%', top: '72%' }} />
            <span className="shard" style={{ left: '30%', top: '50%' }} />
          </div>

          <Routes>
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
                  <QuestionPage />
                </ProtectedRoute>
              }
            />

            {/* Protected admin routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute adminOnly>
                  {/* Admin dashboard component will go here */}
                  <div className="min-h-screen bg-black text-white flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-orange-400 mb-4">Admin Dashboard</h1>
                      <p className="text-gray-400">Coming soon...</p>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}
