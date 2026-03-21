import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const toLocalDatetimeValue = (date) => {
  const tzOffsetMs = date.getTimezoneOffset() * 60000;
  const local = new Date(date.getTime() - tzOffsetMs);
  return local.toISOString().slice(0, 16);
};

const getToday8pm = () => {
  const now = new Date();
  now.setHours(20, 0, 0, 0);
  return toLocalDatetimeValue(now);
};

export default function Page3() {
  const [dateTime, setDateTime] = useState(getToday8pm);
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('page3Calendar');
    if (saved) setCalendar(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('page3Calendar', JSON.stringify(calendar));
  }, [calendar]);

  const addSchedule = (e) => {
    e.preventDefault();

    const nextCalendar = dateTime ? [...calendar, dateTime] : [...calendar];
    setCalendar(nextCalendar);
    window.localStorage.setItem('page3Calendar', JSON.stringify(nextCalendar));
    setDateTime('');
  };

  const recipientEmail = 'pyndaica@gmail.com';

  const sendMail = () => {
    if (calendar.length === 0) {
      alert('Cần chọn ít nhất 1 lịch trước khi gửi email.');
      return;
    }

    const body = encodeURIComponent(
      `Xin chào,\n\nEm đã chọn lịch sau:\n- ${calendar.join('\n- ')}\n\nHẹn gặp lại nhé!`
    );
    window.location.href = `mailto:${recipientEmail}?subject=Lịch%20hẹn%20chọn%20trên%20website&body=${body}`;
  };

  const now = new Date();
  const getMinDateTime = () => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  };

  const getTodayAt8Pm = () => {
    const d = new Date();
    d.setHours(20, 0, 0, 0);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  };

  return (
    <section className="page page3">
      <h2>Chọn lịch cho đi nè bé </h2>
      <p>Chọn ngày giờ và nhấn "Thêm" để lưu vào danh sách lịch.</p>

      <form className="schedule-form" onSubmit={addSchedule}>
        <label>
          
          <input
            type="datetime-local"
            value={dateTime}
            min={getMinDateTime()}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </label>
        <div className="btn-center">
          <button type="button" onClick={() => setDateTime(getTodayAt8Pm())} style={{ padding: '6px 10px', borderRadius: '8px', background: '#ff9ab4', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Hôm nay
          </button>
          <button type="submit">Thêm lịch</button>
        </div>
      </form>

      <div className="calendar-list colored-calendar" style={{ maxWidth: '460px', margin: '0 auto', textAlign: 'left' }}>
        <h3>Danh sách lịch đã chọn</h3>
        {calendar.length === 0 ? (
          <p style={{ color: '#b61c7a', fontWeight: 700 }}>Chưa có lịch nào. Hãy thêm lịch.</p>
        ) : (
          <ol>
            {calendar.map((item, idx) => (
              <li key={idx} style={{ color: '#2f5597', margin: '6px 0', fontWeight: 600 }}>
                {new Date(item).toLocaleString('vi-VN')}
              </li>
            ))}
          </ol>
        )}
      </div>

      <img
        src="https://media.giphy.com/media/3ohs4BSacFKI7A717y/giphy.gif"
        alt="Cute gif"
        style={{ maxWidth: '420px', width: '100%', borderRadius: '14px', marginTop: '18px' }}
      />

      <div className="pager" style={{ marginTop: '18px' }}>
     <button className="btn-primary" onClick={() => navigate('/page3')} >
      <Link className='pr' to="/page4">Ấn vào đây nè bée ơi UWU</Link>
        </button>
        
      </div>
    </section>
  );
}

