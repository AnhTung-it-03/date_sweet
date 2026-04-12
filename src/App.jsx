import { Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import AuthModal from './AuthModal';
import Home from './pages/Home';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import Page6 from './pages/Page6';
import Page7 from './pages/Page7';

function AppContent() {
  const { showAuthModal, setShowAuthModal, user, logout } = useAuth();

  return (
    <div className="app">
      <header style={{ position: 'relative' }}>
        <img
          src="/download.png"
          alt="Logo"
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            width: '50px',
            height: '50px',
            cursor: 'pointer',
            zIndex: 10
          }}
          onClick={() => setShowAuthModal(true)}
        />
        <nav style={{ marginLeft: '70px' }}>
          <span style={{ marginRight: '12px', fontWeight: '600', color: '#6b0f42' }}>
            {user ? `Người dùng: ${user.username} (${user.domain})` : 'Chưa đăng nhập'}
          </span>
          <Link to="/">Trang đầu</Link>
          {/* <Link to="/page2">Trang 2</Link>
          <Link to="/page3">Trang 3</Link>
          <Link to="/page4">Trang 4</Link>
          <Link to="/page5">Trang 5</Link>
          <Link to="/page6">Trang 6</Link>
          <Link to="/page7">Trang 7</Link> */}
          {user && <button onClick={logout} style={{ marginLeft: '10px', background: '#ef476f', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px' }}>Đăng xuất</button>}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/page4" element={<Page4 />} />
          <Route path="/page5" element={<Page5 />} />
          <Route path="/page6" element={<Page6 />} />
          <Route path="/page7" element={<Page7 />} />
          <Route path="*" element={<p>Không tìm thấy trang</p>} />
        </Routes>
      </main>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
