import { useState } from 'react';
import { Modal } from '../../common/Modal';
import api from '../../../services/api';
import toast from 'react-hot-toast';
import { useTeams } from '../useTeams';

export const UploadCSVModal = ({ isOpen, onClose }) => {
  const { fetchTeams } = useTeams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return toast.error('Select a CSV file');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      console.log('📤 Uploading file:', file.name);

      const res = await api.post('admin/teams/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('✅ Server response:', res.data);
      toast.success('CSV uploaded successfully');
      fetchTeams();
      onClose();
    } catch (err) {
      console.error('❌ Upload error:', err.response || err);
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Teams CSV"
      actions={[
        { label: 'Cancel', onClick: onClose },
        { label: 'Upload', onClick: handleUpload, variant: 'primary', loading },
      ]}
    >
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        style={{ color: '#e6e6e6' }}
      />
    </Modal>
  );
};
