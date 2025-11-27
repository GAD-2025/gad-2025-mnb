import React from 'react';
import '../styles/Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h1>Welcome to My Service</h1>
        <p>This is a brief and catchy description of the service.</p>
        <button>Get Started</button>
      </div>
    </div>
  );
};

export default Banner;
