// import { useNavigate } from 'react-router-dom';
// import glitchImg1 from '@/assets/images/universe.jpg';
// import glitchImg2 from '@/assets/images/universe2.jpg';
// import glitchImg3 from '@/assets/images/universe3.jpg';
// import glitchImg4 from '@/assets/images/universe4.jpg';
// import '@/styles/Home.css';

// const cards = [
//   { id: 1, title: 'Glitch 01', tagline: 'JavaScript anomalies detected.', image: glitchImg1 },
//   { id: 2, title: 'Glitch 02', tagline: 'Python entropy rising.', image: glitchImg2 },
//   { id: 3, title: 'Glitch 03', tagline: 'C++ vectors misaligned.', image: glitchImg3 },
//   { id: 4, title: 'Glitch 04', tagline: 'Java class distortion.', image: glitchImg4 },
// ];

// export default function Home() {
//   const navigate = useNavigate();

//   return (
//     <div className="universe-page scanline">
//       <section className="universe-page__hero">
//         <h1 className="universe-page__hero-title">PROCOM Multiverse Debugging Challenge</h1>
//         <p className="universe-page__hero-subtitle">
//           Choose your universe and fix the corrupted code.
//         </p>
//       </section>

//       <section className="universe-page__grid">
//         {cards.map((card) => (
//           <div
//             key={card.id}
//             className="universe-page__card"
//             role="button"
//             tabIndex={0}
//             data-id={card.id}
//             aria-label={`Open ${card.title}`}
//             onClick={() => navigate(`/question/${card.id}`)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' || e.key === ' ') navigate(`/question/${card.id}`);
//             }}
//           >
//             <img className="universe-page__card-img" src={card.image} alt={card.title} />
//             <div className="universe-page__card-overlay">
//               <div className="universe-page__card-title">{card.title}</div>
//               <div className="universe-page__card-tagline">{card.tagline}</div>
//             </div>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// }
