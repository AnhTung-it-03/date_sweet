import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [textSize, setTextSize] = useState(40);

  const increaseSize = () => {
    const screenMax = Math.min(window.innerWidth, window.innerHeight) * 0.9;
    setTextSize((prev) => Math.min(prev + 20, screenMax));
  };

  return (
    <section className="page home-page">
      <h1 className="play-title">Em ơi đi chơi với anh nhé bây bìii</h1>
      <div className="control-row">
        <div>
<button className="btn-primary" onClick={() => navigate('/page2')} style={{ fontSize: `${textSize}px` }}>
          Dạaaa
        </button>
        </div>
        <div>
    <button className="btn-secondary" onClick={increaseSize}>
          Em hong chịu đâu
        </button>
        </div>

      </div>
      <img
        src="public/gift/plesase_cat.gif"
        alt="Mèo Pleeease"
        className="hero-img"
      />
    </section>
  );
}
