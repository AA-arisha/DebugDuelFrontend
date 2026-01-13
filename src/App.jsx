import { Routes, Route, Link, useLocation } from 'react-router-dom';

import { HomePage, LoginForm, BattleRounds, QuestionPage } from './pages/index';

export default function App() {
  const location = useLocation();
  // const showHeader = location.pathname !== '/';

  return (
    <div className="app-shell">
      {/* {showHeader && (
        <header className="app-header">
          <Link to="/" className="brand">
            PROCOM Multiverse Debugging Challenge
          </Link>
        </header>
      )} */}

      <main className="app-main">
        <div key={location.pathname} className="route-container route-swizzle">
          <div className="parallax-shards" aria-hidden="true">
            <span className="shard" style={{ left: '8%', top: '12%' }} />
            <span className="shard" style={{ left: '88%', top: '72%' }} />
            <span className="shard" style={{ left: '30%', top: '50%' }} />
          </div>

          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path='universes' element={<Home/>}/> */}
            <Route path="login" element={<LoginForm />} />
            <Route path="battleRounds" element={<BattleRounds />} />
            <Route path="/question/:id" element={<QuestionPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
