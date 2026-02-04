import React from 'react';

export default function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="border-b-2 border-gray-800 bg-gradient-to-r from-gray-900 via-gray-800/50 to-gray-900">
      <div className="flex gap-2 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-bold transition-all relative ${
                isActive ? tab.activeColor : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3 relative z-10">
                <span className="text-2xl">{tab.icon}</span>
                <span>{tab.label}</span>
              </span>
              {isActive && (
                <>
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tab.gradient} rounded-t-full`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${tab.gradient
                      .replace(/from-(\w+-\d+)/g, 'from-$1/20')
                      .replace(/to-(\w+-\d+)/g, 'to-$1/20')} rounded-t-lg`}
                  />
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
