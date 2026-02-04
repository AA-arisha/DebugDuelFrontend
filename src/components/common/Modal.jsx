export const Modal = ({
  isOpen,
  // onClose,
  title,
  children,
  width = 'max-w-md',
  actions = [],
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.6)' }}
    >
      <div
        className={`w-full ${width} rounded-lg p-6`}
        style={{
          background: '#111114',
          border: '1px solid rgba(255, 122, 0, 0.3)',
        }}
      >
        {title && (
          <h2 className="mb-4 text-xl font-bold" style={{ color: '#e6e6e6' }}>
            {title}
          </h2>
        )}

        {/* Content */}
        <div>{children}</div>

        {/* Footer Actions */}
        <div className="mt-6 flex justify-end gap-3">
          {actions.map((action, index) => {
            const isPrimary = action.variant === 'primary';
            const isDanger = action.variant === 'danger';

            return (
              <button
                key={index}
                onClick={action.onClick}
                disabled={action.disabled || action.loading}
                className="px-4 py-2 rounded-lg font-semibold transition-all hover:brightness-110 disabled:opacity-50"
                style={{
                  background: isPrimary
                    ? '#ff7a00'
                    : isDanger
                    ? 'rgba(239, 68, 68, 0.2)'
                    : 'transparent',
                  color: isPrimary ? '#050406' : isDanger ? '#ef4444' : '#ff7a00',
                  border: isPrimary ? 'none' : '2px solid #ff7a00',
                }}
              >
                {action.loading ? 'Please wait...' : action.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
