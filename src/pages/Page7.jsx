import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Page7() {
  const { user } = useAuth();
  const STORAGE_KEY = user ? `page7Itineraries_${user.domain}_${user.id}` : 'page7Itineraries';
  const [itineraries, setItineraries] = useState([]);
  const [selected, setSelected] = useState(new Set());

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setItineraries(JSON.parse(stored));
  }, [STORAGE_KEY]);

  const clearAll = () => {
    if (confirm('Bạn có chắc chắn muốn xóa tất cả lịch Page 7?')) {
      localStorage.removeItem(STORAGE_KEY);
      setItineraries([]);
      setSelected(new Set());
    }
  };

  const deleteSelected = () => {
    if (selected.size === 0) return;
    if (confirm(`Bạn có chắc chắn muốn xóa ${selected.size} lịch đã chọn?`)) {
      const newItineraries = itineraries.filter(item => !selected.has(item.id));
      setItineraries(newItineraries);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItineraries));
      setSelected(new Set());
    }
  };

  const toggleSelect = (id) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  const groupByDate = (items) => {
    const groups = {};
    items.forEach((item) => {
      const dateKey = new Date(item.dateTime).toLocaleDateString('vi-VN');
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(item);
    });
    return groups;
  };

  const grouped = groupByDate(itineraries);

  // Only display if user is logged in
  if (!user) {
    return (
      <section className="page page7">
        <h1>Tất cả lịch đi chơi theo ngày</h1>
        <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center', padding: '40px 10px' }}>
          <p style={{ fontSize: '18px', color: '#666' }}>
            Vui lòng <strong>đăng nhập</strong> để xem cơ sở dữ liệu lịch của bạn.
          </p>
          <Link to="/" style={{ color: '#ff1493', textDecoration: 'underline', fontSize: '16px' }}>
            Quay lại trang chủ
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page page7">
      <h1>Tất cả lịch đi chơi theo ngày</h1>
      <h2>
        Đây là tất cả các lịch của chúng mình nè bé.
      </h2>

      <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'left', padding: '10px', border: '1px solid #ffd3e2', borderRadius: '12px', background: '#fff8fb' }}>
        {itineraries.length === 0 ? (
          <p>Chưa có lịch nào. Vui lòng xác nhận lịch ở Page 6.</p>
        ) : (
          Object.keys(grouped).map((day) => (
            <section key={day} style={{ marginBottom: '16px' }}>
              <h3 style={{ borderBottom: '1px solid #ffd3e2', paddingBottom: '4px' }}>{day}</h3>
              <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                {grouped[day].map((item) => (
                  <li key={item.id} style={{ marginBottom: '10px' }}>
                    {user && (
                      <input
                        type="checkbox"
                        checked={selected.has(item.id)}
                        onChange={() => toggleSelect(item.id)}
                        style={{ marginRight: '10px' }}
                      />
                    )}
                    <div><strong>Thời gian:</strong> {new Date(item.dateTime).toLocaleString('vi-VN')}</div>
                    <div><strong>Hoạt động:</strong> {item.activities.join(', ')}</div>
                    <div><strong>Hình thức xem phim:</strong> {item.movieChoice}</div>
                    <div><strong>Món ăn:</strong> {item.foods.join(', ')}</div>
                    <div><small>Đã lưu: {item.savedAt}</small></div>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>

      {user && (
        <div style={{ marginTop: '10px' }}>
          <button onClick={deleteSelected} disabled={selected.size === 0} style={{ background: '#ef476f', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 14px', cursor: selected.size > 0 ? 'pointer' : 'not-allowed', marginRight: '10px' }}>
            Xóa đã chọn ({selected.size})
          </button>
          <button onClick={clearAll} style={{ background: '#ef476f', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer' }}>
            Xóa tất cả Page 7
          </button>
        </div>
      )}
    </section>
  );
}
