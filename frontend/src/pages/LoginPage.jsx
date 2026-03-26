import { useState } from 'react';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('admin@hospital.com');
  const [password, setPassword] = useState('Admin@123');
  const [role, setRole] = useState('ROLE_USER');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload = mode === 'login' ? { email, password } : { email, password, role };
      const { data } = await client.post(endpoint, payload);
      login(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Request failed. Check backend status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="aurora" />
      <form className="auth-card" onSubmit={submit}>
        <h1>Hospital Bed Tracker</h1>
        <p>Secure real-time bed visibility for emergency response.</p>

        <div className="switch-row">
          <button
            className={mode === 'login' ? 'tab active' : 'tab'}
            type="button"
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={mode === 'register' ? 'tab active' : 'tab'}
            type="button"
            onClick={() => setMode('register')}
          >
            Register
          </button>
        </div>

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />

        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />

        {mode === 'register' && (
          <>
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="ROLE_USER">User</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
          </>
        )}

        {error && <div className="error-msg">{error}</div>}

        <button className="primary" disabled={loading} type="submit">
          {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}
