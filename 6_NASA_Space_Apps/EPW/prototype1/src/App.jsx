// App.jsx
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import MultiStarSystem from './components/MultiStarSystem'; // Import the star system
import './App.css';
import starSystemsData from './multiStarSystemData.json'; // Import the JSON data

import DraggablePerspectiveWindow from './components/DraggablePerspectiveWindow';
import './components/DraggablePerspectiveWindow.css'; // Import the CSS file

const App = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [firstObject, setFirstObject] = useState(null);
  const [secondObject, setSecondObject] = useState(null);

  // Get all available objects from the JSON
  const allObjects = starSystemsData.starSystems.flatMap((system) => {
    return [system.name, ...system.planets.map((planet) => planet.name)];
  });

  return (
    <div className="app">
      <header className="header">
        <h1>Exoplanet_Watch</h1>
      </header>
      <div className="main">
        <aside className="sidebar">
          <button onClick={() => setActiveTab(0)}>Solar System</button>
          <button onClick={() => setActiveTab(1)}>Star Systems</button>
          <button onClick={() => setActiveTab(2)}>Tab 3</button>
          <button onClick={() => setActiveTab(3)}>Tab 4</button>
        </aside>
        <div>
        <DraggablePerspectiveWindow />
        </div>
          <Canvas className="canvas-container" >
            {activeTab === 0 && <MultiStarSystem />}
          </Canvas>
      </div>
    </div>
  );
};

export default App;
