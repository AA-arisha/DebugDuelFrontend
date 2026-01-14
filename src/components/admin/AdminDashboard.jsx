import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { Shield, Users, Trophy, Settings, LogOut, Target, Activity, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      icon: Users,
      label: 'Active Teams',
      value: '24',
      change: '+3',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Target,
      label: 'Active Rounds',
      value: '5',
      change: '+1',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Trophy,
      label: 'Completed',
      value: '147',
      change: '+12',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Activity,
      label: 'Success Rate',
      value: '78%',
      change: '+5%',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'rounds', label: 'Rounds', icon: Target },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Command Center</h1>
                <p className="text-sm text-gray-400 font-mono">Welcome, {user?.username}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-900/30 hover:bg-red-900/50 border border-red-500/50 rounded-lg text-red-400 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-mono text-sm">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="relative group">
                <div
                  className="absolute -inset-0.5 bg-gradient-to-r opacity-50 group-hover:opacity-75 rounded-xl blur transition-opacity"
                  style={{
                    backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                    '--tw-gradient-from': stat.color.split(' ')[0].replace('from-', ''),
                    '--tw-gradient-to': stat.color.split(' ')[1].replace('to-', ''),
                  }}
                ></div>

                <div className="relative bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-green-400 text-sm font-bold font-mono">
                      {stat.change}
                    </span>
                  </div>

                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400 font-mono">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-2 mb-6 border-b border-gray-800">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-mono text-sm transition-all ${
                  activeTab === tab.id
                    ? 'text-orange-400 border-b-2 border-orange-500 bg-orange-500/10'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-8">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Activity className="w-6 h-6 text-orange-400" />
                System Overview
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-gray-800">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Last Updated</span>
                  </div>
                  <span className="text-gray-400 font-mono">Just now</span>
                </div>

                <div className="p-6 bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-lg">
                  <p className="text-orange-300 font-mono text-sm mb-2">System Status</p>
                  <p className="text-white text-lg">All systems operational</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'teams' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Users className="w-6 h-6 text-orange-400" />
                Team Management
              </h2>
              <p className="text-gray-400 font-mono">Team management features coming soon...</p>
            </div>
          )}

          {activeTab === 'rounds' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-orange-400" />
                Round Management
              </h2>
              <p className="text-gray-400 font-mono">Round management features coming soon...</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Settings className="w-6 h-6 text-orange-400" />
                System Settings
              </h2>
              <p className="text-gray-400 font-mono">Settings panel coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
