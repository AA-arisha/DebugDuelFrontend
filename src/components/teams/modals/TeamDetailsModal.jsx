import { Modal } from '../../common/Modal';

export const TeamDetailsModal = ({ isOpen, onClose, team }) => {
  if (!team || !team.members?.length) return null;

  const teamName = team.members[0]?.username;
  const teamPassword = team.members[0]?.password;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Team Details"
      actions={[{ label: 'Close', onClick: onClose }]}
    >
      {/* Team Info */}
      <div
        style={{
          background: '#0b0a0d',
          padding: '12px',
          borderRadius: '10px',
          marginBottom: '16px',
        }}
      >
        <p style={{ color: '#e6e6e6', marginBottom: '6px' }}>
          <strong style={{ color: '#b0a7a2' }}>Team Name:</strong> {teamName || '—'}
        </p>

        <p style={{ color: '#e6e6e6', marginBottom: '6px' }}>
          <strong style={{ color: '#b0a7a2' }}>Created At:</strong>{' '}
          {new Date(team.createdAt).toLocaleString()}
        </p>

        <p style={{ color: '#e6e6e6' }}>
          <strong style={{ color: '#b0a7a2' }}>Team Password:</strong>{' '}
          <span
            style={{
              background: '#15131a',
              padding: '2px 8px',
              borderRadius: '6px',
              fontFamily: 'monospace',
              color: '#ffb703',
            }}
          >
            {teamPassword}
          </span>
        </p>
      </div>

      {/* Members */}
      <div>
        <p
          style={{
            color: '#b0a7a2',
            marginBottom: '8px',
            fontWeight: 600,
          }}
        >
          Members ({team.members.length})
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {team.members.map((m, index) => (
            <div
              key={index}
              style={{
                background: '#0b0a0d',
                padding: '10px',
                borderRadius: '10px',
                border: m.isLeader ? '1px solid #ff7a00' : '1px solid #1f1d25',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '4px',
                }}
              >
                <span style={{ color: '#e6e6e6', fontWeight: 500 }}>
                  {m.fullName || 'Unnamed Member'}
                </span>

                {m.isLeader && (
                  <span
                    style={{
                      background: '#ff7a00',
                      color: '#000',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    Leader
                  </span>
                )}
              </div>

              <p style={{ color: '#9a9191', fontSize: '14px' }}>{m.email || 'No email'}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
