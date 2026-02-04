import React from 'react';
import { Button } from '../ui/button';

export default function RoundControlHeader() {
  return (
    <header className="space-y-2 flex items-center justify-between">
      <div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Round Control Panel
        </h1>
        <p className="text-gray-400">Manage round settings, questions, and submissions</p>
      </div>
    </header>
  );
}
