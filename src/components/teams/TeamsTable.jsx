// TeamsTable.jsx
import { TeamRow } from './TeamRow';

export const TeamsTable = ({ teams, onView, onEdit, onDelete }) => (
  <div
    className="rounded-lg overflow-hidden"
    style={{ background: '#111114', border: '1px solid rgba(255,122,0,0.28)' }}
  >
    {/* Header with total teams */}
    <div className="px-6 py-3 text-sm" style={{ background: '#0b0b0d', color: '#b0a7a2' }}>
      Total Teams: <span style={{ color: '#ff7a00' }}>{teams.length}</span>
    </div>

    <table className="w-full">
      <thead>
        <tr style={{ background: '#0b0b0d' }}>
          <th className="px-6 py-4 text-left">#</th>
          <th className="px-6 py-4 text-left">Team</th>
          <th className="px-6 py-4 text-left">Email</th>
          <th className="px-6 py-4 text-left">Created</th>
          <th className="px-6 py-4 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {teams.length === 0 ? (
          <tr>
            <td colSpan="5" className="px-6 py-10 text-center" style={{ color: '#b0a7a2' }}>
              No teams found
            </td>
          </tr>
        ) : (
          teams.map((t, index) => (
            <TeamRow
              key={t.id}
              index={index + 1}
              team={t}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </tbody>
    </table>
  </div>
);
