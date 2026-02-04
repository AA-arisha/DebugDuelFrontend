import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * ParticipantLayout
 *
 * Wraps all participant routes (/, /login, /battleRounds, /question/:id)
 * Plain CSS is applied only within this layout.
 *
 * This layout:
 * - Uses Outlet to render child route components
 * - Imports ONLY plain CSS files (no Tailwind)
 * - Keeps participant styles isolated from admin (Tailwind) styles
 * - Can be gradually migrated to Tailwind as needed
 *
 * CSS Loading Order (specific to participant pages only):
 */

// Load participant-specific CSS
import '../styles/Home.css';
import '../styles/HomePage.css';
import '../styles/QuestionPage.css';
import '../styles/theme.css';
import '../styles/components.css';

const ParticipantLayout = () => {
  return (
    <div className="participant-layout">
      <Outlet />
    </div>
  );
};

export default ParticipantLayout;
