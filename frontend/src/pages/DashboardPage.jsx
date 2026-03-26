import { useCallback, useEffect, useMemo, useState } from 'react';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import BedTable from '../components/BedTable';
import AdminUpdateForm from '../components/AdminUpdateForm';

const wards = ['ALL', 'GENERAL', 'ICU', 'EMERGENCY'];

export default function DashboardPage() {
  const { email, role, logout } = useAuth();
  const [ward, setWard] = useState('ALL');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBeds = useCallback(async () => {
    try {
      const params = ward === 'ALL' ? {} : { ward };
      const { data } = await client.get('/api/beds', { params });
      setRows(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to fetch bed status');
    } finally {
      setLoading(false);
    }
  }, [ward]);

  useEffect(() => {
    fetchBeds();
    const timer = setInterval(fetchBeds, 5000);
    return () => clearInterval(timer);
  }, [fetchBeds]);

  const totals = useMemo(() => {
    return rows.reduce(
      (acc, row) => {
        acc.total += row.totalBeds;
        acc.occupied += row.occupiedBeds;
        acc.available += row.availableBeds;
        return acc;
      },
      { total: 0, occupied: 0, available: 0 }
    );
  }, [rows]);

  return (
    <div className="dashboard-shell">
      <header className="topbar">
        <div>
          <h1>Real-Time Bed Availability</h1>
          <p>
            Signed in as <strong>{email}</strong> ({role})
          </p>
        </div>
        <button className="ghost" onClick={logout}>Logout</button>
      </header>

      <div className="stats-grid">
        <article>
          <h4>Total Beds</h4>
          <p>{totals.total}</p>
        </article>
        <article>
          <h4>Occupied Beds</h4>
          <p>{totals.occupied}</p>
        </article>
        <article>
          <h4>Available Beds</h4>
          <p>{totals.available}</p>
        </article>
      </div>

      <div className="toolbar">
        {wards.map((w) => (
          <button
            key={w}
            className={ward === w ? 'chip active' : 'chip'}
            onClick={() => {
              setLoading(true);
              setWard(w);
            }}
          >
            {w}
          </button>
        ))}
      </div>

      {role === 'ROLE_ADMIN' && <AdminUpdateForm onUpdated={fetchBeds} />}

      {error && <div className="error-msg">{error}</div>}
      {loading ? <div className="loading">Refreshing records...</div> : <BedTable rows={rows} />}
    </div>
  );
}
