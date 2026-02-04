import { useEffect, useState } from 'react';
import {
  useTeams,
  TeamActions,
  TeamSearch,
  TeamsTable,
  TeamModal,
  UploadCSVModal,
  TeamDetailsModal,
} from '../components/teams/index.js';

const TeamsListPage = () => {
  const { teams, fetchTeams, deleteTeam } = useTeams();
  const [search, setSearch] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const filtered = teams.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen p-8" style={{ background: '#050406' }}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6" style={{ color: '#e6e6e6' }}>
          Teams Management
        </h1>

        <TeamActions
          onCreate={() => {
            setSelectedTeam(null);
            setShowForm(true);
          }}
          onUpload={() => setShowUpload(true)}
        />

        <TeamSearch value={search} onChange={setSearch} />

        <TeamsTable
          teams={filtered}
          onView={(t) => {
            setSelectedTeam(t);
            setShowDetails(true);
          }}
          onEdit={(t) => {
            setSelectedTeam(t);
            setShowForm(true);
          }}
          onDelete={deleteTeam}
        />

        <TeamModal
          isOpen={showForm}
          selectedTeam={selectedTeam}
          onClose={() => setShowForm(false)}
        />

        <UploadCSVModal isOpen={showUpload} onClose={() => setShowUpload(false)} />

        <TeamDetailsModal
          isOpen={showDetails}
          team={selectedTeam}
          onClose={() => setShowDetails(false)}
        />
      </div>
    </div>
  );
};

export default TeamsListPage;
