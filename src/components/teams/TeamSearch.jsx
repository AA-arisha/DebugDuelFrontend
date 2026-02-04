import { Search } from 'lucide-react';

export const TeamSearch = ({ value, onChange }) => (
  <div className="mb-6 relative">
    <Search
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2"
      style={{ color: '#b0a7a2' }}
    />
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search teams..."
      className="w-full pl-12 pr-4 py-3 rounded-lg outline-none"
      style={{ background: '#0b0b0d', color: '#e6e6e6' }}
    />
  </div>
);
