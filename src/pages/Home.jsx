import { useNavigate } from 'react-router-dom'
import glitchImg1 from '../images/universe1.jpg'
import glitchImg2 from '../images/universe2.jpg'
import glitchImg3 from '../images/universe3.jpg'
import glitchImg4 from '../images/universe4.jpg'

const cards = [
  { id: 1, title: 'Glitch 01', tagline: 'JavaScript anomalies detected.', image: glitchImg1 },
  { id: 2, title: 'Glitch 02', tagline: 'Python entropy rising.', image: glitchImg2 },
  { id: 3, title: 'Glitch 03', tagline: 'C++ vectors misaligned.', image: glitchImg3 },
  { id: 4, title: 'Glitch 04', tagline: 'Java class distortion.', image: glitchImg4 },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="scanline">
      <section className="hero">
        <h1 className="hero-title">PROCOM Multiverse Debugging Challenge</h1>
        <p className="hero-subtitle">Choose your universe and fix the corrupted code.</p>
      </section>

      {/* <div className="hero-card scanline" aria-label="Primary multiverse anchor image">
        <img src={heroImg} alt="Sci-fi city multiverse hero" />
      </div> */}

      <section className="grid">
        {cards.map(card => (
          <div
            key={card.id}
            className="card"
            role="button"
            tabIndex={0}
            data-id={card.id}
            aria-label={`Open ${card.title}`}
            onClick={() => navigate(`/question/${card.id}`)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(`/question/${card.id}`) }}
          >
            <img className="card-img" src={card.image} alt={card.title} />
            <div className="card-overlay">
              <div className="card-title">{card.title}</div>
              <div className="card-tagline">{card.tagline}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}