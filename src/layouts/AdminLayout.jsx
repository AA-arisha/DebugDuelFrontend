import React from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../components/common/Layout';

// Import Tailwind CSS and admin theme
import '../styles/tailwind.css';
import '../styles/admin.css';
import { Toaster } from 'react-hot-toast';
/**
 * AdminLayout
 *
 * Wraps all admin routes (/admin, /admin/teams, /admin/rounds, etc.)
 * Tailwind CSS is applied only within this layout.
 *
 * This layout:
 * - Renders the Tailwind-styled sidebar and header via Layout component
 * - Uses Outlet to render child route components
 * - Only loads Tailwind styles (no plain CSS)
 * - Keeps admin styles isolated from participant styles
 */
const AdminLayout = () => {
  return (
    <Layout>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000, // 3 seconds
          style: { background: '#1c1c1f', color: '#e6e6e6' },
        }}
      />
      {<Outlet />}
    </Layout>
  );
};

export default AdminLayout;
