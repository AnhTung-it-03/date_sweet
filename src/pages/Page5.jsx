import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const options = [
  { id: 'di-luon', label: 'Đi lượn', img: '/img/di_luon.jpg' },
  { id: 'tro-choi', label: 'Trò chơi', img: '/img/tro_choi.jpg' },
  { id: 'rap-phim', label: 'Xem phim', img: '/img/rap_phim.jpg' },
  { id: 'to-tuong', label: 'Tô tượng', img: '/img/to_tuong.jpg' },
  { id: 'ngoi-ho', label: 'Dạo hồ', img: '/img/dao_ho.jpg' },
  { id: 'cong-vien', label: 'Công viên', img: '/img/cong.jpg' },
];

export default function Page4() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const toggleOption = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const [movieChoice, setMovieChoice] = useState('');

  const canShowMovieOptions = selected.includes('rap-phim');

  const submit = () => {
    if (selected.length === 0) {
      alert('Chọn ít nhất một lựa chọn trước khi kết thúc.');
      return;
    }

    if (canShowMovieOptions && !movieChoice) {
      alert('Chọn Netflix hoặc Rạp phim khi bạn đã chọn Xem phim.');
      return;
    }

    const payload = { selected, movieChoice: canShowMovieOptions ? movieChoice : undefined };
    localStorage.setItem('page4Choice', JSON.stringify(payload));
    navigate('/page6', { state: payload });
  };

  return (
    <section className="page page4">
      <h1>Em muốn chúng ta đi đâuuu</h1>
      

      <div className="activity-grid">
        {options.map((option) => (
          <button
            key={option.id}
            className={`activity-card ${selected.includes(option.id) ? 'active' : ''}`}
            type="button"
            onClick={() => toggleOption(option.id)}
          >
            <img src={option.img} alt={option.label} />
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      {canShowMovieOptions && (
        <div className="movie-choice" style={{ marginTop: '18px' }}>
          <p>Chọn hình thức xem phim:</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setMovieChoice('netflix')}
              style={{
                border: movieChoice === 'netflix' ? '3px solid #ff5a91' : '2px solid #eec1d3',
                borderRadius: '14px',
                padding: '8px',
                background: '#fff',
                cursor: 'pointer',
                width: '150px',
                textAlign: 'center',
              }}
            >
              <img src="/img/netflix.jpg" alt="Netflix" style={{ width: '100%', borderRadius: '10px' }} />
              <div style={{ marginTop: '6px', fontWeight: 700 }}>Netflix</div>
            </button>

            <button
              type="button"
              onClick={() => setMovieChoice('rap')}
              style={{
                border: movieChoice === 'rap' ? '3px solid #ff5a91' : '2px solid #eec1d3',
                borderRadius: '14px',
                padding: '8px',
                background: '#fff',
                cursor: 'pointer',
                width: '150px',
                textAlign: 'center',
              }}
            >
              <img src="/img/rap_phim.jpg" alt="Rạp phim" style={{ width: '100%', borderRadius: '10px' }} />
              <div style={{ marginTop: '6px', fontWeight: 700 }}>Rạp phim</div>
            </button>
          </div>
        </div>
      )}

      <button className="finish-btn" type="button" onClick={submit}>
        Kết Thúc
      </button>
    </section>
  );
}

