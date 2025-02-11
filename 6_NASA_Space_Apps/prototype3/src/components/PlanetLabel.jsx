import React from 'react';
import './PlanetLabel.css'; // Import CSS for styling

const PlanetLabel = ({ position, name }) => {
  return (
    <div
      className="planet-label"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y+10}px`,
      }}
    >
      {name}
    </div>
  );
};

export default PlanetLabel;
