import { useEffect, useState } from 'react';
import { Modal } from '../../common/Modal';
import api from '../../../services/api';
import toast from 'react-hot-toast';
import { useTeams } from '../useTeams';

export const TeamModal = ({ isOpen, onClose, selectedTeam }) => {
  const { fetchTeams } = useTeams();
  const isEdit = Boolean(selectedTeam);

  const [teamName, setTeamName] = useState('');

  const [leaderName, setLeaderName] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');

  const [members, setMembers] = useState([
    { name: '', email: '' },
    { name: '', email: '' },
  ]);

  const [passwordOption, setPasswordOption] = useState('AUTO');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  /* ---------------- HYDRATE ON EDIT ---------------- */

  useEffect(() => {
    if (!isOpen) return;

    if (!selectedTeam) {
      resetForm();
      return;
    }

    setTeamName(selectedTeam.name);

    const leader = selectedTeam.members.find((m) => m.isLeader);
    setLeaderName(leader?.fullName || '');
    setLeaderEmail(leader?.email || '');

    const others = selectedTeam.members
      .filter((m) => !m.isLeader)
      .map((m) => ({ name: m.fullName || '', email: m.email || '' }));

    setMembers([...others, ...Array(2 - others.length).fill({ name: '', email: '' })]);

    setPasswordOption('MANUAL'); // editing should be explicit
    setPassword('');
  }, [isOpen, selectedTeam]);

  const resetForm = () => {
    setTeamName('');
    setLeaderName('');
    setLeaderEmail('');
    setMembers([
      { name: '', email: '' },
      { name: '', email: '' },
    ]);
    setPasswordOption('AUTO');
    setPassword('');
    setShowPreview(false);
  };

  /* ---------------- VALIDATION ---------------- */

  const validMembers = members.filter((m) => m.name.trim() && m.email.trim());

  const totalMembers = 1 + validMembers.length;

  const validate = () => {
    if (!teamName || !leaderName || !leaderEmail) {
      toast.error('Required fields are missing');
      return false;
    }

    if (totalMembers < 1 || totalMembers > 3) {
      toast.error('Team must have 1–3 members total');
      return false;
    }

    if (passwordOption === 'MANUAL' && !password) {
      toast.error('Password is required');
      return false;
    }

    return true;
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      teamName,
      leader: {
        name: leaderName,
        email: leaderEmail,
      },
      members: validMembers,
      passwordOption,
      password: passwordOption === 'MANUAL' ? password : undefined,
    };

    setLoading(true);
    try {
      if (isEdit) {
        await api.put(`admin/teams/${selectedTeam.id}`, payload);
        toast.success('Team updated successfully');
      } else {
        await api.post('admin/teams', payload);
        toast.success('Team created successfully');
      }

      fetchTeams();
      onClose();
    } catch {
      toast.error('Failed to save team');
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- PREVIEW ---------------- */

  if (showPreview) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => setShowPreview(false)}
        title={isEdit ? 'Confirm Team Update' : 'Confirm Team Creation'}
        actions={[
          { label: 'Back', onClick: () => setShowPreview(false) },
          {
            label: isEdit ? 'Update Team' : 'Create Team',
            onClick: handleSubmit,
            variant: 'primary',
            loading,
          },
        ]}
      >
        <div style={{ color: '#e6e6e6' }}>
          <p>
            <strong>Team:</strong> {teamName}
          </p>
          <p>
            <strong>Leader:</strong> {leaderName} ({leaderEmail})
          </p>

          {validMembers.length > 0 && (
            <>
              <p className="mt-3">
                <strong>Members:</strong>
              </p>
              <ul className="list-disc ml-5">
                {validMembers.map((m, i) => (
                  <li key={i}>
                    {m.name} ({m.email})
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="mt-3">
            <strong>Password:</strong> {passwordOption === 'AUTO' ? 'Auto-generated' : password}
          </p>
        </div>
      </Modal>
    );
  }

  /* ---------------- FORM ---------------- */

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Team' : 'Create Team'}
      actions={[
        { label: 'Cancel', onClick: onClose },
        {
          label: 'Preview',
          onClick: () => setShowPreview(true),
          variant: 'primary',
        },
      ]}
    >
      {/* Team Name */}
      <Input label="Team Name *" value={teamName} onChange={setTeamName} />

      {/* Leader */}
      <Input label="Leader Name *" value={leaderName} onChange={setLeaderName} />
      <Input label="Leader Email *" value={leaderEmail} onChange={setLeaderEmail} />

      {/* Members */}
      <label style={{ color: '#b0a7a2' }}>Team Members (max 2)</label>
      {members.map((m, i) => (
        <div key={i} className="flex gap-2 mt-2">
          <input
            placeholder="Name"
            value={m.name}
            onChange={(e) => {
              const copy = [...members];
              copy[i].name = e.target.value;
              setMembers(copy);
            }}
            className="w-1/2 p-2 rounded-lg"
            style={{ background: '#0b0b0d', color: '#e6e6e6' }}
          />
          <input
            placeholder="Email"
            value={m.email}
            onChange={(e) => {
              const copy = [...members];
              copy[i].email = e.target.value;
              setMembers(copy);
            }}
            className="w-1/2 p-2 rounded-lg"
            style={{ background: '#0b0b0d', color: '#e6e6e6' }}
          />
        </div>
      ))}

      {/* Password */}
      <div className="mt-4">
        <label style={{ color: '#b0a7a2' }}>Password</label>
        <div className="mt-2">
          <label className="mr-4">
            <input
              type="radio"
              checked={passwordOption === 'AUTO'}
              onChange={() => setPasswordOption('AUTO')}
            />{' '}
            Auto-generate
          </label>
          <label>
            <input
              type="radio"
              checked={passwordOption === 'MANUAL'}
              onChange={() => setPasswordOption('MANUAL')}
            />{' '}
            Enter manually
          </label>
        </div>

        {passwordOption === 'MANUAL' && (
          <input
            className="w-full mt-2 p-2 rounded-lg"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ background: '#0b0b0d', color: '#e6e6e6' }}
          />
        )}
      </div>
    </Modal>
  );
};

/* --------- Small helper input (keeps JSX clean) --------- */

const Input = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label style={{ color: '#b0a7a2' }}>{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mt-1 p-2 rounded-lg"
      style={{ background: '#0b0b0d', color: '#e6e6e6' }}
    />
  </div>
);
