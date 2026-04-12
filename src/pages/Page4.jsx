import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const foods = [
  { id: 'nuong', label: 'Nướng', img: '/img/nuong.png' },
  { id: 'trung_nuong', label: 'Trứng nướng', img: '/img/trung_nuong.png' },
  { id: 'oc', label: 'Ốc', img: '/img/oc.jpg' },
  { id: 'my-cay', label: 'Mỳ cay', img: '/img/mi_cay.jpg' },
  { id: 'nem-nuong', label: 'Nem nướng', img: '/img/nem_nuong.jpg' },
  { id: 'lau-thai', label: 'Lẩu Thái', img: '/img/lau.jpg' },
  { id: 'ga-ran', label: 'Gà rán', img: '/img/ga_ran.jpg' },
  { id: 'ca-vien-chien', label: 'Xiên Bẩn', img: '/img/xien_ban.jpg' },
];

export default function Page4() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);

  const goNext = () => {
    if (selected.length === 0) {
      alert('Chọn ít nhất một món ăn trước khi tiếp tục.');
      return;
    }
    localStorage.setItem('page4Food', JSON.stringify(selected));
    navigate('/page5');
  };

  useEffect(() => {
    const saved = localStorage.getItem('page4Food');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setSelected(parsed);
        else setSelected([]);
      } catch {
        setSelected([]);
      }
    } else {
      setSelected([]);
    }
  }, []);

  const clearSelection = () => {
    setSelected([]);
    localStorage.removeItem('page4Food');
  };

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="page page4">
      <h1>Lựa món mà em thích điii nàaa?</h1>
      <p style={{ color: '#d83361', fontWeight: 700 }}>Chọn ít nhất 1 món rồi nhấn "Tiếp UWU" nhé.</p>

      <div className="activity-grid">
        {foods.map((food) => (
          <button
            key={food.id}
            type="button"
            className={`activity-card ${selected.includes(food.id) ? 'active' : ''}`}
            onClick={() => toggle(food.id)}
          >
            <img src={food.img} alt={food.label} />
            <span>{food.label}</span>
          </button>
        ))}
      </div>

      <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontWeight: 700, color: '#c6377f' }}>
          Đã chọn: {selected.length} món
        </span>
        <button type="button" onClick={clearSelection} style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #c6377f', background: '#fff', color: '#c6377f', cursor: 'pointer' }}>
          Xóa chọn
        </button>
      </div>

      <div style={{ marginTop: '12px' }}>
          <button className="finish-btn" type="button" onClick={goNext}>
            Tiếp UWU
          </button>
      </div>

    </section>
  );
}


