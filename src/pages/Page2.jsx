import { Link } from 'react-router-dom';

export default function Page2() {
  return (
    <section className="page page2">
      <p className='hint'>Then Kiu bấy biiì</p>
      <div className="pager">
        <img 
        src="/gift/smile.gif"
        alt="Mèo Pleeease"
        className="okey-img"
      />
              <p className='hint'>bất ngờ chưa cục zàng</p>
              <button className="btn-primary" onClick={() => navigate('/page3')} >
      <Link className='pr' to="/page3">Ấn vào đây nè bée ơi UWU</Link>
        </button>
             
      </div>
    </section>
  );
}
