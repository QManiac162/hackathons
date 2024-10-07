import React, { Suspense, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

import './css/App.css';
import './css/index.css';
import './css/Styles.css';

import Dialog from './Dialog.js';
import planetData from './planetData.js'; 
import starSystemsData from './test.json'; 

import DraggablePerspectiveWindow from './components/DraggablePerspectiveWindow';
import './components/DraggablePerspectiveWindow.js';
import MultiStarSystem from './components/MultiStarSystem';


export default function App() {
  const [dialogueData, setDialogueData] = useState(null);
  const [activeTab, setActiveTab] = useState(0); // Track the active tab
  const hideDialoge = () => {
    setDialogueData(null);
  };

  // Get all star systems and their planets from planetData
  const allStarSystems = starSystemsData.starSystems;

  return (
    <div className="App">
      <Dialog hideDialoge={hideDialoge} dialogueData={dialogueData} />
      
      {/* Tabs for switching between different star systems */}
      <header className="header">
        <h1>Exoplanet Watch</h1>
        <div className="tabs">
          <button onClick={() => setActiveTab(0)}>Solar System</button>
          {allStarSystems.map((system, index) => (
            <button key={index + 1} onClick={() => setActiveTab(index + 1)}>
              {system.name}
            </button>
          ))}
        </div>
      </header>
      
      {/* Draggable window */}
      <div>
        <DraggablePerspectiveWindow />
      </div>
      
      {/* Canvas for rendering planets and star systems */}
      <div className="main">
        <Canvas className="canvas-container">
          <Suspense fallback={null}>
            {activeTab === 0 && (
              <>
                <Sun />
                {planetData.map((planet, index) => (
                  <Planet
                    planet={planet}
                    key={index}
                    setDialogueData={setDialogueData}
                  />
                ))}
              </>
            )}
            
            {/* Render the other star systems based on the active tab */}
            {activeTab > 0 && (
              <>
                <Sun />
                {allStarSystems[activeTab - 1].planets.map((planet, index) => (
                  <Planet
                    planet={planet}
                    key={index}
                    setDialogueData={setDialogueData}
                  />
                ))}
              </>
            )}
            
            <Lights />
            <OrbitControls />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}


function Ecliptic({ xRadius = 1, zRadius = 1 }) {
  const points = [];
  for (let index = 0; index < 64; index++) {
    const angle = (index / 64) * 2 * Math.PI;
    const x = xRadius * Math.cos(angle);
    const z = zRadius * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0, z));
  }
  points.push(points[0]);
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color="#BFBBDA" linewidth={10} />
    </line>
  );
}

function Sun() {
  return (
    <mesh>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshStandardMaterial color="yellow" /> {/* Static sun color */}
    </mesh>
  );
}

function Planet({
  planet: {
    color,
    xRadius,
    zRadius,
    size,
    speed,
    offset,
    rotationSpeed,
    name
  },
  setDialogueData
}) {
  const planetRef = React.useRef();

  // Random color for planet
  const randomColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    const x = xRadius * Math.sin(t);
    const z = zRadius * Math.cos(t);
    planetRef.current.position.x = x;
    planetRef.current.position.z = z;
    planetRef.current.rotation.y += rotationSpeed;
  });

  return (
    <>
      <mesh
        ref={planetRef}
        onClick={() => setDialogueData({ name, color })}
        onPointerOver={() => setDialogueData({ name, color })}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={randomColor} /> {/* Random color */}
        <Html distanceFactor={15}>
          <div className="annotation">{name}</div>
        </Html>
      </mesh>
      <Ecliptic xRadius={xRadius} zRadius={zRadius} />
    </>
  );
}

function Lights() {
  return (
    <>
      <ambientLight />
      <pointLight position={[0, 0, 0]} />
    </>
  );
}