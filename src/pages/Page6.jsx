import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Page6() {
  const { user } = useAuth();
  const STORAGE_KEY = user ? `page7Itineraries_${user.domain}_${user.id}` : 'page7Itineraries';
  const [page3Calendar, setPage3Calendar] = useState([]);
  const [page4Food, setPage4Food] = useState([]);
  const [page5Choice, setPage5Choice] = useState(null);
  const [savedItineraries, setSavedItineraries] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const c3 = localStorage.getItem('page3Calendar');
    if (c3) setPage3Calendar(JSON.parse(c3));

    const c4 = localStorage.getItem('page4Food');
    if (c4) setPage4Food(JSON.parse(c4));

    const c5 = localStorage.getItem('page5Choice');
    if (c5) setPage5Choice(JSON.parse(c5));

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setSavedItineraries(JSON.parse(stored));
  }, [STORAGE_KEY]);

  const confirmSchedule = () => {
    if (!user) {
      alert('Vui lòng đăng nhập để lưu lịch.');
      return;
    }

    if (page3Calendar.length === 0) {
      alert('Vui lòng chọn lịch ngày giờ ở Trang 3 trước khi xác nhận.');
      return;
    }

    if (page4Food.length === 0) {
      alert('Vui lòng chọn món ăn ở Trang 4 trước khi xác nhận.');
      return;
    }

    if (!page5Choice || page5Choice.selected.length === 0) {
      alert('Vui lòng chọn hoạt động ở Trang 5 trước khi xác nhận.');
      return;
    }

    const newItineraries = page3Calendar.map((date) => ({
      id: `${date}-${Date.now()}`,
      dateTime: date,
      activities: page5Choice.selected,
      movieChoice: page5Choice.movieChoice || 'Không chọn',
      foods: page4Food,
      savedAt: new Date().toLocaleString('vi-VN'),
    }));

    const merged = [...newItineraries, ...savedItineraries];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    setSavedItineraries(merged);
    alert('Xác nhận xong! Lịch sẽ được lưu trong Trang 7.');
  };
  
  return (
    <section className="page page6">
      <h1>Bé xác nhận lại lịch nhé </h1>
     

      <section style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'left', padding: '10px', border: '1px solid #f2b6d3', borderRadius: '12px', background: '#fff7f9' }}>
        <h3>1) Lịch ngày giờ</h3>
        {page3Calendar.length === 0 ? (
          <p>Chưa có lịch được chọn.</p>
        ) : (
          <ul style={{ color: '#2f5597' }}>
            {page3Calendar.map((item, idx) => (
              <li key={idx}>{new Date(item).toLocaleString('vi-VN')}</li>
            ))}
          </ul>
        )}

        <h3>2) Món ăn</h3>
        {page4Food.length > 0 ? (
          <ul style={{ color: '#d83361' }}>
            {page4Food.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>Chưa có món ăn được chọn.</p>
        )}

        <h3>3) Hoạt động</h3>
        {page5Choice ? (
          <div>
            <p>Hoạt động: {page5Choice.selected.join(', ') || 'Chưa chọn'}</p>
            <p>Hình thức xem phim: {page5Choice.movieChoice || 'Không chọn'}</p>
          </div>
        ) : (
          <p>Chưa có lựa chọn hoạt động.</p>
        )}
      </section>

      <button
        type="button"
        onClick={confirmSchedule}
        style={{ marginTop: '14px', padding: '10px 16px', borderRadius: '8px', background: '#ff5a91', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        Bé đặt lịch ạ!
      </button>

      <section style={{ marginTop: '16px', maxWidth: '680px', marginLeft: 'auto', marginRight: 'auto' }}>
       
        {savedItineraries.length === 0 ? (
          <p>Chưa có dữ liệu ở Page 7. Nhấn xác nhận để lưu lịch vào cơ sở dữ liệu.</p>
        ) : (
          <p style={{ color: '#d83361', fontWeight: 700 }}>
          Bé có tổng cộng {savedItineraries.length} Lịch với anh iuuu.
          </p>
        )}
      </section>

      <div className="paper" style={{ marginTop: '18px' }}>
     <button
        style={{ marginTop: '14px', padding: '10px 16px', borderRadius: '8px', background: '#ff5a91', color: '#fff', border: 'none', cursor: 'pointer' }}
        onClick={() => navigate("/page3")}
      >
        Bé muốn sửa lịch ạ
      </button>

      <span style={{ margin: '0 8px' }}></span>

      <button
        style={{ marginTop: '14px', padding: '10px 16px', borderRadius: '8px', background: '#ff5a91', color: '#fff', border: 'none', cursor: 'pointer' }}
        onClick={() => navigate("/page7")}
      >
        Bé muốn xem tất cả lịch
      </button>
      </div>
    </section>
  );
}
