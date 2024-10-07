import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import Draggable from 'react-draggable';
import starSystemsData from '../multiStarSystemData.json';

const DraggablePerspectiveWindow = () => {
  const [selectedBody, setSelectedBody] = useState('');
  const [secondSelectedBody, setSecondSelectedBody] = useState('');
  const [zoomLevel, setZoomLevel] = useState(5); // Add a zoom level state

  // Extract all celestial bodies from JSON data
  const allBodies = [];
  starSystemsData.starSystems.forEach(system => {
    allBodies.push(system.name);
    system.planets.forEach(planet => {
      allBodies.push(planet.name);
    });
  });
  const getBodyColor = (bodyName) => {
    for (const system of starSystemsData.starSystems) {
      if (system.name === bodyName) {
        return system.color; // Assuming 'color' is a property of the star
      }
      for (const planet of system.planets) {
        if (planet.name === bodyName) {
          return planet.color; // Assuming 'color' is a property of the planet
        }
      }
    }
    return 'white'; // Default color if not found
  };
  // Handle changes in the dropdowns
  const handleFirstSelect = (event) => {
    setSelectedBody(event.target.value);
    setSecondSelectedBody(''); // Reset second selection
  };

  const handleSecondSelect = (event) => {
    setSecondSelectedBody(event.target.value);
  };

  // Calculate the position for perspective view
  const calculatePosition = (fromBody, toBody) => {
    const from = findBodyPosition(fromBody);
    const to = findBodyPosition(toBody);
    if (from && to) {
      return new Vector3(to.x - from.x, to.y - from.y, to.z - from.z);
    }
    return new Vector3(0, 0, 0);
  };

  // Find the 3D position of the selected body
  const findBodyPosition = (bodyName) => {
    for (const system of starSystemsData.starSystems) {
      if (system.name === bodyName) {
        return { x: 0, y: 0, z: 0 }; // Assuming the star is at the origin
      }
      for (const planet of system.planets) {
        if (planet.name === bodyName) {
          return { x: planet.distance, y: 0, z: 0 }; // Placeholder position
        }
      }
    }
    return null; // Not found
  };

  // Handle mouse wheel event for zoom
  const handleWheel = (event) => {
    event.preventDefault();
    setZoomLevel((prevZoom) => Math.max(1, prevZoom + (event.deltaY > 0 ? -1 : 1))); // Change zoom level based on scroll direction
  };

  return (
    <Draggable>
      <div className="draggable-window" onWheel={handleWheel}>
        <div className="dropdown-container">
          <select value={selectedBody} onChange={handleFirstSelect}>
            <option value="">Select a body</option>
            {allBodies.map((body, index) => (
              <option key={index} value={body}>{body}</option>
            ))}
          </select>

          <select value={secondSelectedBody} onChange={handleSecondSelect} disabled={!selectedBody}>
            <option value="">Select a second body</option>
            {allBodies.filter(body => body !== selectedBody).map((body, index) => (
              <option key={index} value={body}>{body}</option>
            ))}
          </select>
        </div>

        <div className="canvas-container">
          <Canvas style={{ width: '200px', height: '200px' }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {selectedBody && secondSelectedBody && (
              <mesh position={calculatePosition(selectedBody, secondSelectedBody)}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color={getBodyColor(secondSelectedBody)} />
              </mesh>
            )}
            <OrbitControls enableZoom={true} zoomSpeed={1} minDistance={1} maxDistance={zoomLevel * 10} />
          </Canvas>
        </div>
      </div>
    </Draggable>
  );
};

export default DraggablePerspectiveWindow;
