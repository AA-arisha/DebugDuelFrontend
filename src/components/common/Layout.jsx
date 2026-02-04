import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  X,
  LogOut,
  LayoutDashboard,
  Users,
  Zap,
  Trophy,
  Clock,
  Code,
  Settings,
  Bug,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/useAuth';

const Layout = ({ children }) => {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Teams', href: '/admin/teams', icon: Users },
    { name: 'Rounds', href: '/admin/rounds', icon: Clock },
  ];

  return (
    <div className="flex h-screen bg-neutral-950">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-lg hover:bg-orange-100"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-5 w-5 text-orange-600" />
      </Button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-gray-950 border-r border-gray-800 shadow-2xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Decorative gradient accent on left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-red-500 to-pink-500"></div>

        {/* Logo */}
        <div className="relative flex items-center justify-between h-20 px-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
              <Code className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">Debug Duel</h1>
              <p className="text-xs text-orange-400 font-bold">Admin Portal</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-400 hover:bg-gray-800 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="relative mt-6 space-y-2 px-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`group relative flex items-center gap-4 rounded-xl px-5 py-3.5 text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/20'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon
                  className={`h-5 w-5 transition-transform duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-500 group-hover:text-orange-400 group-hover:scale-110'
                  }`}
                />

                <span className="relative">{item.name}</span>

                {isActive && (
                  <div className="absolute right-3">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-lg shadow-white/50" />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 w-full border-t border-gray-800 bg-gray-950 p-4">
          <button
            onClick={() => logout()}
            className="flex w-full items-center gap-4 rounded-xl px-5 py-3.5 text-sm font-bold text-red-400 transition-all duration-200 hover:bg-gray-800 hover:text-red-300 hover:shadow-md group"
          >
            <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto ">
          {children || (
            <div className="text-center py-12">
              <Code className="w-16 h-16 text-orange-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Debug & Die</h2>
              <p className="text-gray-600">Your content will appear here</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;
