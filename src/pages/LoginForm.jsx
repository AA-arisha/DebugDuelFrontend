import React, { useState } from 'react';
import { Eye, EyeOff, Swords, Shield } from 'lucide-react';

// Generate particle styles once at module level (outside component)
const particleStyles = Array.from({ length: 40 }).map(() => ({
  width: `${Math.random() * 3 + 1}px`,
  height: `${Math.random() * 3 + 1}px`,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  background: Math.random() > 0.5 ? '#ff6b35' : '#fbbf24',
  opacity: Math.random() * 0.6 + 0.2,
  animation: `float ${Math.random() * 10 + 5}s linear infinite`,
  animationDelay: `${Math.random() * 5}s`,
  boxShadow: '0 0 10px currentColor',
}));

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [password, setPassword] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  const handleSubmit = () => {
    console.log('Team entering battle:', { teamName, password });
    // Add your login logic here
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-black">
      {/* Animated particle field - like floating ash */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particleStyles.map((style, i) => (
          <div key={i} className="absolute rounded-full" style={style} />
        ))}
      </div>

      {/* Scanning lines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"
          style={{ top: '20%', animationDuration: '3s' }}
        />
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse"
          style={{ top: '60%', animationDuration: '4s', animationDelay: '1s' }}
        />
      </div>

      {/* Main battle terminal */}
      <div className="relative w-full max-w-lg">
        {/* Outer energy field */}
        <div
          className="absolute -inset-2 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 rounded-3xl blur-2xl opacity-40 animate-pulse"
          style={{ animationDuration: '3s' }}
        ></div>

        {/* Corner accents */}
        <div className="absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-orange-500 rounded-tl-2xl"></div>
        <div className="absolute -top-2 -right-2 w-16 h-16 border-t-2 border-r-2 border-orange-500 rounded-tr-2xl"></div>
        <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-2 border-l-2 border-red-500 rounded-bl-2xl"></div>
        <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-red-500 rounded-br-2xl"></div>

        {/* Main glass panel */}
        <div className="relative backdrop-blur-2xl bg-gradient-to-br from-red-950/40 via-black/60 to-orange-950/40 rounded-2xl p-10 shadow-2xl border border-red-500/30">
          {/* Header - Battle Terminal */}
          <div className="text-center mb-10">
            {/* Skull/Warning Icon */}
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-red-600 blur-xl opacity-50 animate-pulse"></div>
              {/* <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center border-2 border-orange-400 shadow-lg shadow-red-500/50">
                <Swords className="w-10 h-10 text-white animate-pulse" style={{ animationDuration: '2s' }} />
              </div> */}
              {/* Orbiting particles */}
              <div
                className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 animate-spin"
                style={{ animationDuration: '8s' }}
              >
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-orange-500 rounded-full -translate-x-1/2 shadow-lg shadow-orange-500"></div>
                <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-red-500 rounded-full -translate-x-1/2 shadow-lg shadow-red-500"></div>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
              BATTLE TERMINAL
            </h1>
            <p className="text-red-400 text-sm uppercase tracking-wider font-mono mb-1">
              Authorization Required
            </p>
            <p className="text-gray-500 text-xs font-mono">[ UNIVERSE STATUS: CRITICAL ]</p>
          </div>

          {/* Input Fields */}
          <div className="space-y-6 mb-8">
            {/* Team Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-orange-400 block uppercase tracking-wider font-mono flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Team Designation
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg opacity-30 group-hover:opacity-50 blur transition-opacity"></div>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="ENTER SQUAD NAME..."
                  className="relative w-full px-4 py-4 bg-black/60 backdrop-blur-sm border-2 border-red-500/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:shadow-lg focus:shadow-orange-500/30 transition-all font-mono uppercase"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-orange-400 block uppercase tracking-wider font-mono flex items-center gap-2">
                <Swords className="w-4 h-4" />
                Access Code
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg opacity-30 group-hover:opacity-50 blur transition-opacity"></div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="************"
                  className="relative w-full px-4 py-4 pr-12 bg-black/60 backdrop-blur-sm border-2 border-red-500/50 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:shadow-lg focus:shadow-orange-500/30 transition-all font-mono"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-400 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Enter Battle Button */}
          <button
            onClick={handleSubmit}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="relative w-full py-4 px-6 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 hover:from-red-500 hover:via-orange-500 hover:to-red-500 text-white font-bold rounded-lg shadow-2xl shadow-red-600/50 transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden group border-2 border-orange-400/50"
          >
            <span className="relative z-10 flex items-center justify-center gap-3 text-lg uppercase tracking-wider font-mono">
              <Swords
                className={`w-6 h-6 transition-transform duration-500 ${
                  isHovering ? 'rotate-180' : ''
                }`}
              />
              ENTER THE BATTLEFIELD
              <Swords
                className={`w-6 h-6 transition-transform duration-500 ${
                  isHovering ? 'rotate-180' : ''
                }`}
              />
            </span>
            {/* Animated shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </button>

          {/* Status bar */}
          <div className="mt-8 pt-6 border-t border-red-900/50">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gray-600">
                SECTOR: <span className="text-red-400">UNKNOWN</span>
              </span>
              <span className="text-gray-600">
                THREAT LEVEL: <span className="text-orange-400 animate-pulse">MAXIMUM</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom glitch effect */}
        <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50 animate-pulse"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(5px);
          }
        }
      `}</style>
    </div>
  );
}
