// TeamRow.jsx
import { Eye, Edit2, Trash2 } from 'lucide-react';

export const TeamRow = ({ index, team, onView, onEdit, onDelete }) => (
  <tr style={{ borderBottom: '1px solid rgba(255,122,0,0.1)' }}>
    {/* Index */}
    <td className="px-6 py-4" style={{ color: '#b0a7a2' }}>
      {index}
    </td>

    {/* Team name */}
    <td className="px-6 py-4">{team.name}</td>

    {/* Leader email */}
    <td className="px-6 py-4" style={{ color: '#b0a7a2' }}>
      {team.members.find((m) => m.isLeader)?.email || '-'}
    </td>

    {/* Created date */}
    <td className="px-6 py-4" style={{ color: '#b0a7a2' }}>
      {team.createdAt}
    </td>

    {/* Actions */}
    <td className="px-6 py-4 flex gap-2">
      <button onClick={() => onView(team)}>
        <Eye size={18} />
      </button>
      <button onClick={() => onEdit(team)}>
        <Edit2 size={18} />
      </button>
      <button onClick={() => onDelete(team.id)}>
        <Trash2 size={18} />
      </button>
    </td>
  </tr>
);
