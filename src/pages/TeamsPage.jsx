import React, { useState } from 'react';
import api from '@/services/api';
import {
  Upload,
  Plus,
  Download,
  Search,
  Edit2,
  Trash2,
  Eye,
  X,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { useEffect } from 'react';
import TeamModal from '@/components/teams/modals/TeamModal';
import toast from 'react-hot-toast';

const TeamsDashboard = () => {
  const [currentView, setCurrentView] = useState('list');
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const [showUploadModal, setShowUploadModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [_createdTeam, _setCreatedTeam] = useState(null);
  const [teams, setTeams] = useState([]);
  const [_isLoading, setIsLoading] = useState(true);
  const [_error, setError] = useState(null);
  const [uploadPreview, _setUploadPreview] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('admin/teams');
      setTeams(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch teams. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteTeam = async (id) => {
    if (!id) return;
    try {
      setIsPending(true);
      await api.delete(`admin/teams/${id}`);
      toast.success('Team deleted successfully');
      setSelectedTeam(null);
      await fetchTeams();
    } catch (err) {
      toast.error('Failed to delete team');
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitTeam = async (teamData) => {
    setIsPending(true);
    try {
      if (selectedTeam) {
        // UPDATE team
        const updatedTeam = await api.put(`admin/teams/${selectedTeam.id}`, teamData);
        setSelectedTeam(updatedTeam); // optional, if you want to keep editing
        toast.success('Team updated successfully');
        return updatedTeam;
      } else {
        // CREATE new team
        const newTeam = await api.post('admin/teams', teamData);
        return newTeam;
      }
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsPending(false);
    }
  };

  const TeamsListPage = () => (
    <div className="min-h-screen p-8" style={{ background: '#050406' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#e6e6e6' }}>
            Teams Management
          </h1>
          <p className="text-lg" style={{ color: '#b0a7a2' }}>
            Create, update, and manage participating teams
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => {
              setSelectedTeam(null); // reset for new team
              setShowModal(true);
            }}
            className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all hover:brightness-110"
            style={{ background: '#ff7a00', color: '#050406' }}
          >
            <Plus size={20} />
            Create Team
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all hover:brightness-110"
            style={{ background: '#7a3f2a', color: '#e6e6e6' }}
          >
            <Upload size={20} />
            Upload CSV
          </button>
          <button
            className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all hover:brightness-110"
            style={{ background: 'transparent', border: '2px solid #ff7a00', color: '#ff7a00' }}
          >
            <Download size={20} />
            Download CSV
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2"
              size={20}
              style={{ color: '#b0a7a2' }}
            />
            <input
              type="text"
              placeholder="Search teams by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg outline-none transition-all"
              style={{
                background: '#0b0b0d',
                color: '#e6e6e6',
                border: '2px solid transparent',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(255, 122, 0, 0.55)')}
              onBlur={(e) => (e.target.style.borderColor = 'transparent')}
            />
          </div>
        </div>

        {/* Teams Table */}
        <div
          className="rounded-lg overflow-hidden"
          style={{ background: '#111114', border: '1px solid rgba(255, 122, 0, 0.28)' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  style={{
                    background: '#0b0b0d',
                    borderBottom: '1px solid rgba(255, 122, 0, 0.28)',
                  }}
                >
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#e6e6e6' }}>
                    Team Name
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#e6e6e6' }}>
                    Email
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#e6e6e6' }}>
                    Created At
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#e6e6e6' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTeams.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center" style={{ color: '#b0a7a2' }}>
                      No teams created yet.
                    </td>
                  </tr>
                ) : (
                  filteredTeams.map((team) => (
                    <tr
                      key={team.id}
                      className="transition-colors cursor-pointer"
                      style={{ borderBottom: '1px solid rgba(255, 122, 0, 0.1)' }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = 'rgba(255, 122, 0, 0.05)')
                      }
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td className="px-6 py-4" style={{ color: '#e6e6e6' }}>
                        {team.name}
                      </td>
                      <td className="px-6 py-4" style={{ color: '#b0a7a2' }}>
                        {team.members.find((member) => member.isLeader)?.email || '-'}
                      </td>
                      <td className="px-6 py-4" style={{ color: '#b0a7a2' }}>
                        {team.createdAt}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedTeam(team);
                              setCurrentView('details');
                            }}
                            className="p-2 rounded transition-all hover:brightness-110"
                            style={{ background: 'rgba(255, 122, 0, 0.2)', color: '#ff7a00' }}
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedTeam(team); // pass the team you want to edit
                              setShowModal(true);
                            }}
                            className="p-2 rounded transition-all hover:brightness-110"
                            style={{ background: 'rgba(255, 122, 0, 0.2)', color: '#ff7a00' }}
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteTeam(team.id)}
                            className="p-2 rounded transition-all hover:brightness-110"
                            style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const UploadCSVModal = () => (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(0,0,0,0.8)' }}
    >
      <div
        className="rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8"
        style={{ background: '#111114', border: '1px solid rgba(255, 122, 0, 0.28)' }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold" style={{ color: '#e6e6e6' }}>
            Upload Teams CSV
          </h2>
          <button onClick={() => setShowUploadModal(false)} style={{ color: '#b0a7a2' }}>
            <X size={24} />
          </button>
        </div>

        <div className="p-4 rounded-lg mb-6" style={{ background: '#0b0b0d' }}>
          <h3 className="font-semibold mb-2" style={{ color: '#e6e6e6' }}>
            Instructions
          </h3>
          <p style={{ color: '#b0a7a2' }}>
            Upload a CSV or XLSX file with columns: Team Name, Email, Leader Name
          </p>
        </div>

        <div className="mb-6">
          <input type="file" accept=".csv,.xlsx" className="mb-4" style={{ color: '#e6e6e6' }} />
          <button
            className="px-6 py-3 rounded-lg font-semibold transition-all hover:brightness-110"
            style={{ background: '#ff7a00', color: '#050406' }}
          >
            <Upload className="inline mr-2" size={20} />
            Upload File
          </button>
        </div>

        <div
          className="rounded-lg overflow-hidden"
          style={{ background: '#0b0b0d', border: '1px solid rgba(255, 122, 0, 0.28)' }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 122, 0, 0.28)' }}>
                <th className="px-4 py-3 text-left" style={{ color: '#e6e6e6' }}>
                  Team Name
                </th>
                <th className="px-4 py-3 text-left" style={{ color: '#e6e6e6' }}>
                  Email
                </th>
                <th className="px-4 py-3 text-left" style={{ color: '#e6e6e6' }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {uploadPreview.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 122, 0, 0.1)' }}>
                  <td className="px-4 py-3" style={{ color: '#e6e6e6' }}>
                    {item.name}
                  </td>
                  <td className="px-4 py-3" style={{ color: '#b0a7a2' }}>
                    {item.email}
                  </td>
                  <td className="px-4 py-3">
                    {item.status === 'valid' && <span style={{ color: '#4ade80' }}>✓ Valid</span>}
                    {item.status === 'renamed' && (
                      <span style={{ color: '#ff7a00' }}>⚠ Renamed</span>
                    )}
                    {item.status === 'invalid' && (
                      <span style={{ color: '#ef4444' }}>✗ Invalid</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            className="flex-1 py-3 rounded-lg font-semibold transition-all hover:brightness-110"
            style={{ background: '#ff7a00', color: '#050406' }}
          >
            Confirm Upload
          </button>
          <button
            onClick={() => setShowUploadModal(false)}
            className="flex-1 py-3 rounded-lg font-semibold transition-all hover:brightness-110"
            style={{ background: '#7a3f2a', color: '#e6e6e6' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const TeamDetailsPage = () => (
    <div className="min-h-screen p-8" style={{ background: '#050406' }}>
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => setCurrentView('list')}
          className="mb-6 px-4 py-2 rounded-lg transition-all hover:brightness-110"
          style={{ background: '#7a3f2a', color: '#e6e6e6' }}
        >
          ← Back to Teams
        </button>

        <div
          className="rounded-xl p-8 mb-6 bg-gradient-to-r from-gray-900 to-orange-900"
          style={{ boxShadow: '0 10px 40px rgba(255, 122, 0, 0.3)' }}
        >
          <h1 className="text-4xl font-bold" style={{ color: '#e6e6e6' }}>
            {selectedTeam?.name}
          </h1>
          <p className="mt-2" style={{ color: '#b0a7a2' }}>
            {selectedTeam?.email}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div
            className="p-6 rounded-xl"
            style={{
              background: '#111114',
              border: '1px solid rgba(255, 122, 0, 0.28)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: '#e6e6e6' }}>
              Team Password
            </h3>
            <div className="p-4 rounded-lg" style={{ background: '#0b0b0d' }}>
              <p className="text-3xl font-mono font-bold text-center" style={{ color: '#ff7a00' }}>
                {selectedTeam?.password}
              </p>
            </div>
          </div>

          <div
            className="p-6 rounded-xl"
            style={{
              background: '#111114',
              border: '1px solid rgba(255, 122, 0, 0.28)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: '#e6e6e6' }}>
              Team Leader
            </h3>
            <p className="text-lg font-semibold" style={{ color: '#e6e6e6' }}>
              {selectedTeam?.leader}
            </p>
            <p style={{ color: '#b0a7a2' }}>{selectedTeam?.email}</p>
          </div>

          <div
            className="md:col-span-2 p-6 rounded-xl"
            style={{
              background: '#111114',
              border: '1px solid rgba(255, 122, 0, 0.28)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: '#e6e6e6' }}>
              Team Members
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {selectedTeam?.members.map((member, idx) => (
                <div key={idx} className="p-4 rounded-lg" style={{ background: '#0b0b0d' }}>
                  <p className="font-semibold" style={{ color: '#e6e6e6' }}>
                    {member}
                  </p>
                  <p className="text-sm" style={{ color: '#b0a7a2' }}>
                    Member {idx + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {currentView === 'list' ? <TeamsListPage /> : <TeamDetailsPage />}
      {showModal && (
        <TeamModal
          team={selectedTeam}
          showModal={showModal}
          setShowModal={setShowModal}
          handleSubmitTeam={handleSubmitTeam}
          isPending={isPending}
        />
      )}
      {showUploadModal && <UploadCSVModal />}
    </>
  );
};

export default TeamsDashboard;
