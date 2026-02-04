export function Badge({ children, variant = 'default', className = '' }) {
  const base = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border';

  const variants = {
    default: 'bg-gray-700/20 text-gray-300 border-gray-600',
    primary: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    success: 'bg-green-500/20 text-green-400 border-green-500/40',
    danger: 'bg-red-500/20 text-red-400 border-red-500/40',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
    info: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
  };

  return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>;
}
