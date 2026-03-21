import { useState } from 'react';
import { useAuth } from './AuthContext';

export default function AuthModal({ onClose }) {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!domain) {
      setError('Vui lòng nhập tên miền');
      return;
    }
    if (isLogin) {
      if (login(username, password, domain)) {
        onClose();
      } else {
        setError('Tên đăng nhập hoặc mật khẩu hoặc tên miền sai');
      }
    } else {
      if (register(username, password, domain)) {
        onClose();
      } else {
        setError('Tài khoản đã tồn tại trên tên miền này');
      }
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '300px',
        textAlign: 'center'
      }}>
        <h2>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tên miền"
            value={domain}
            onChange={(e) => setDomain(e.target.value.trim())}
            required
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#ef476f', color: 'white', border: 'none', borderRadius: '4px' }}>
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} style={{ marginTop: '10px', background: 'none', border: 'none', color: '#ef476f' }}>
          {isLogin ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
        </button>
        <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '20px' }}>×</button>
      </div>
    </div>
  );
}