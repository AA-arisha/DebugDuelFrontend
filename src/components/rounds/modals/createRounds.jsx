import { useEffect, useState } from 'react';
import { Modal } from '../../common/Modal';
import toast from 'react-hot-toast';

export const RoundModal = ({ isOpen, onClose, selectedRound, onCreateRound }) => {
  const isEdit = Boolean(selectedRound);

  const [roundNumber, setRoundNumber] = useState('');
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  /* ---------------- HYDRATE ON EDIT ---------------- */
  useEffect(() => {
    if (!isOpen) return;

    if (!selectedRound) {
      resetForm();
      return;
    }

    setRoundNumber(selectedRound.roundNumber || '');
    setName(selectedRound.name || '');
    setDuration(selectedRound.duration || '');
    setWeight(selectedRound.weight || '');
  }, [isOpen, selectedRound]);

  const resetForm = () => {
    setRoundNumber('');
    setName('');
    setDuration('');
    setWeight('');
    setShowPreview(false);
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    if (!roundNumber || !name || !duration || !weight) {
      toast.error('All fields are required');
      return false;
    }

    if (isNaN(roundNumber) || Number(roundNumber) <= 0) {
      toast.error('Round number must be a positive number');
      return false;
    }

    if (isNaN(duration) || Number(duration) <= 0) {
      toast.error('Duration must be a positive number');
      return false;
    }

    if (isNaN(weight) || Number(weight) < 0 || Number(weight) > 100) {
      toast.error('Weight must be between 0 and 100');
      return false;
    }

    return true;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      roundNumber: Number(roundNumber),
      name,
      duration: Number(duration),
      weight: Number(weight),
    };

    setLoading(true);
    try {
      if (isEdit) {
        toast.error('Editing not implemented yet'); // optional: handle edit API
      } else {
        await onCreateRound(payload); // ✅ call the parent function
        toast.success('Round created successfully');
      }
      onClose();
    } catch {
      toast.error('Failed to save round');
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
        title={isEdit ? 'Confirm Round Update' : 'Confirm Round Creation'}
        actions={[
          { label: 'Back', onClick: () => setShowPreview(false) },
          {
            label: isEdit ? 'Update Round' : 'Create Round',
            onClick: handleSubmit,
            variant: 'primary',
            loading,
          },
        ]}
      >
        <div style={{ color: '#e6e6e6' }}>
          <p>
            <strong>Round Number:</strong> {roundNumber}
          </p>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Duration:</strong> {duration} minutes
          </p>
          <p>
            <strong>Weight:</strong> {weight}%
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
      title={isEdit ? 'Edit Round' : 'Create Round'}
      actions={[
        { label: 'Cancel', onClick: onClose },
        {
          label: 'Preview',
          onClick: () => setShowPreview(true),
          variant: 'primary',
        },
      ]}
    >
      <Input
        label="Round Number *"
        type="number"
        value={roundNumber}
        onChange={setRoundNumber}
        placeholder="e.g., 1"
      />

      <Input label="Name *" value={name} onChange={setName} placeholder="e.g., Preliminary Round" />

      <Input
        label="Duration (minutes) *"
        type="number"
        value={duration}
        onChange={setDuration}
        placeholder="e.g., 60"
      />

      <Input
        label="Weight (%) *"
        type="number"
        value={weight}
        onChange={setWeight}
        placeholder="e.g., 25"
      />
    </Modal>
  );
};

/* --------- Small helper input --------- */
const Input = ({ label, value, onChange, type = 'text', placeholder }) => (
  <div className="mb-4">
    <label style={{ color: '#b0a7a2' }}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full mt-1 p-2 rounded-lg"
      style={{ background: '#0b0b0d', color: '#e6e6e6' }}
    />
  </div>
);
