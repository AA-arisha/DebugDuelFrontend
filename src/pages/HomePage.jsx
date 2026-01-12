import { useNavigate } from 'react-router-dom';
import smoke from '../assets/videos/smoke.mp4';
import earth from '../assets/videos/earth.mp4';
import '../styles/HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <section className="landing-page">
      <video className="landing-page__smoke-video" src={smoke} autoPlay muted></video>
      <video className="landing-page__smoke-video" src={earth} autoPlay muted loop></video>

      <h1 className="landing-page__title">
        <span data-letter="D">D</span>
        <span data-letter="E">E</span>
        <span data-letter="B">B</span>
        <span data-letter="U">U</span>
        <span data-letter="G">G</span>
        <span data-letter=" ">&nbsp;</span>
        <span data-letter="D">D</span>
        <span data-letter="U">U</span>
        <span data-letter="E">E</span>
        <span data-letter="L">L</span>
      </h1>

      <h2 className="landing-page__subheading">Fix the code. Pass the tests. Save reality.</h2>

      <button className="landing-page__enter-btn" onClick={() => navigate('/universes')}>
        ENTER DEBUG ARENA
      </button>
    </section>
  );
}
