import React from 'react';
import '../styles/ServiceDescription.css';

const ServiceDescription = () => {
  return (
    <div className="service-description">
      <h2>What We Offer</h2>
      <div className="features">
        <div className="feature">
          <h3>Feature 1</h3>
          <p>Description of feature 1.</p>
        </div>
        <div className="feature">
          <h3>Feature 2</h3>
          <p>Description of feature 2.</p>
        </div>
        <div className="feature">
          <h3>Feature 3</h3>
          <p>Description of feature 3.</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDescription;
