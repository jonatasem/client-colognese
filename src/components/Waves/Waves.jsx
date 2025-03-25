import React from 'react';
import './Waves.scss';

const Waves = () => {
  return (
    <section className="wave-container">
      <svg className="wave" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,0 C25,100 75,0 100,100" />
      </svg>
      <svg className="wave" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ top: '50px' }}>
        <path d="M0,0 C25,100 75,0 100,100" />
      </svg>
      <svg className="wave" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ top: '100px' }}>
        <path d="M0,0 C25,100 75,0 100,100" />
      </svg>
    </section>
  );
};

export default Waves;
