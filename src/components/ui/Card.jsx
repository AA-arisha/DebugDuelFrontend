export function Card({ children, className = '' }) {
  return (
    <div className={`bg-neutral-900 border border-neutral-700 rounded-xl shadow-sm ${className}`}>
      {children}
    </div>
  );
}
