import { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export const useTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('admin/teams');
      setTeams(data);
    } catch {
      toast.error('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  const deleteTeam = async (id) => {
    try {
      await api.delete(`admin/teams/${id}`);
      toast.success('Team deleted');
      fetchTeams();
    } catch {
      toast.error('Failed to delete team');
    }
  };

  return {
    teams,
    loading,
    fetchTeams,
    deleteTeam,
  };
};
