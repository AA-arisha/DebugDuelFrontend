// TeamsTable.jsx
import { TeamRow } from './TeamRow';

export const TeamsTable = ({ teams, onView, onEdit, onDelete }) => (
  <div
    className="rounded-lg overflow-hidden"
    style={{ background: '#111114', border: '1px solid rgba(255,122,0,0.28)' }}
  >
    <table className="w-full">
      <thead>
        <tr style={{ background: '#0b0b0d' }}>
          <th className="px-6 py-4 text-left">Team</th>
          <th className="px-6 py-4 text-left">Email</th>
          <th className="px-6 py-4 text-left">Created</th>
          <th className="px-6 py-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {teams.length === 0 ? (
          <tr>
            <td colSpan="4" className="px-6 py-10 text-center" style={{ color: '#b0a7a2' }}>
              No teams found
            </td>
          </tr>
        ) : (
          teams.map((t) => (
            <TeamRow key={t.id} team={t} onView={onView} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </tbody>
    </table>
  </div>
);
