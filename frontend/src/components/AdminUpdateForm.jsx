import { useState } from 'react';
import client from '../api/client';

export default function AdminUpdateForm({ onUpdated }) {
  const [hospitalName, setHospitalName] = useState('');
  const [ward, setWard] = useState('GENERAL');
  const [totalBeds, setTotalBeds] = useState(20);
  const [occupiedBeds, setOccupiedBeds] = useState(5);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      await client.post('/api/beds', {
        hospitalName,
        ward,
        totalBeds: Number(totalBeds),
        occupiedBeds: Number(occupiedBeds),
      });
      setSuccess('Bed availability updated successfully.');
      onUpdated();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update beds');
    }
  };

  return (
    <form className="admin-form" onSubmit={submit}>
      <h3>Admin Bed Update</h3>
      <input
        placeholder="Hospital Name"
        value={hospitalName}
        onChange={(e) => setHospitalName(e.target.value)}
        required
      />
      <select value={ward} onChange={(e) => setWard(e.target.value)}>
        <option value="GENERAL">General</option>
        <option value="ICU">ICU</option>
        <option value="EMERGENCY">Emergency</option>
      </select>
      <input
        type="number"
        min="1"
        value={totalBeds}
        onChange={(e) => setTotalBeds(e.target.value)}
      />
      <input
        type="number"
        min="0"
        value={occupiedBeds}
        onChange={(e) => setOccupiedBeds(e.target.value)}
      />
      {error && <div className="error-msg">{error}</div>}
      {success && <div className="ok-msg">{success}</div>}
      <button className="primary" type="submit">Update Availability</button>
    </form>
  );
}
