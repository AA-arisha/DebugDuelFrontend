import { Plus, Upload, Download } from 'lucide-react';
import { downloadTeamsPDF } from './downloadTeamsPDF';

export const TeamActions = ({ onCreate, onUpload }) => (
  <div className="flex flex-wrap gap-3 mb-6">
    <button
      onClick={onCreate}
      className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
      style={{ background: '#ff7a00', color: '#050406' }}
    >
      <Plus size={18} /> Create Team
    </button>

    <button
      onClick={onUpload}
      className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
      style={{ background: '#7a3f2a', color: '#e6e6e6' }}
    >
      <Upload size={18} /> Upload CSV
    </button>

    <button
      className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
      style={{
        background: 'transparent',
        border: '2px solid #ff7a00',
        color: '#ff7a00',
      }}
      onClick={downloadTeamsPDF}
    >
      <Download size={18} /> Download CSV
    </button>
  </div>
);
