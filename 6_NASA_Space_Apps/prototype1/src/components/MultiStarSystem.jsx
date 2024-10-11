import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EllipseCurve, Vector3, BufferGeometry, LineBasicMaterial } from 'three';
import starSystemsData from '../multiStarSystemData.json';

const MultiStarSystem = () => {
  const planetRefs = useRef([]);
  const moonRefs = useRef([]);

  useEffect(() => {
    // Resize refs arrays to match number of planets and moons
    planetRefs.current = planetRefs.current.slice(0, starSystemsData.starSystems.reduce((total, system) => total + system.planets.length, 0));
    moonRefs.current = moonRefs.current.slice(0, starSystemsData.starSystems.reduce((total, system) => total + system.planets.reduce((count, planet) => count + (planet.moons ? planet.moons.length : 0), 0), 0));
  }, []);

  // Adjust the height offset for planets and moons
  const heightOffset = 1; // Customize height here

  useFrame(() => {
    let planetIndex = 0;
    let moonIndex = 0;
    
    // Animate planets and moons for all star systems
    starSystemsData.starSystems.forEach((system) => {
      system.planets.forEach((planet) => {
        const angle = Date.now() * 0.001 * planet.orbitalSpeed;
        const x = planet.distance * Math.cos(angle);
        const z = planet.distance * Math.sin(angle);
        
        // Set planet position
        if (planetRefs.current[planetIndex]) {
          planetRefs.current[planetIndex].position.set(x, heightOffset, z); // Adding height offset
        }

        // Animate moons orbiting their planet
        planet.moons?.forEach((moon) => {
          const moonAngle = Date.now() * 0.001 * moon.orbitalSpeed;
          const moonX = moon.distance * Math.cos(moonAngle);
          const moonZ = moon.distance * Math.sin(moonAngle);
          
          // Set moon position relative to the planet
          if (moonRefs.current[moonIndex]) {
            moonRefs.current[moonIndex].position.set(moonX + x, heightOffset, moonZ + z); // Adding height offset
          }
          moonIndex++;
        });

        planetIndex++;
      });
    });
  });

  // Create orbit for planets or moons
  const createOrbit = (distance) => {
    const curve = new EllipseCurve(0, 0, distance, distance, 0, 2 * Math.PI, false, 0);
    const points = curve.getPoints(100);
    const orbitGeometry = new BufferGeometry().setFromPoints(points.map(point => new Vector3(point.x, heightOffset, point.y))); // Adding height to orbits
    const orbitMaterial = new LineBasicMaterial({ color: 0x888888 });
    return <line geometry={orbitGeometry} material={orbitMaterial} />;
  };

  // Calculate position of stars based on Right Ascension
  const calculatePosition = (distance, rightAscension) => {
    const radianRA = (rightAscension * Math.PI) / 180; // Convert RA to radians
    const x = distance * Math.cos(radianRA);
    const z = distance * Math.sin(radianRA);
    return [x, heightOffset, z]; // Adding height offset
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Star Systems */}
      {starSystemsData.starSystems.map((system, systemIndex) => {
        const systemPosition = system.rightAscension !== undefined ? calculatePosition(system.distanceFromSun, system.rightAscension) : [0, heightOffset, 0];
        
        return (
          <group key={system.name} position={systemPosition}>
            {/* Star */}
            <mesh>
              <sphereGeometry args={[system.radius, 32, 32]} />
              <meshStandardMaterial color={system.color} />
            </mesh>

            {/* Orbits and Planets with Moons */}
            {system.planets.map((planet, planetIndex) => (
              <group key={planet.name}>
                {createOrbit(planet.distance)}
                <mesh ref={(el) => (planetRefs.current[planetIndex + systemIndex] = el)}>
                  <sphereGeometry args={[planet.radius, 32, 32]} />
                  <meshStandardMaterial color={planet.color} />
                </mesh>

                {/* Orbits and Moons */}
                {planet.moons?.map((moon, moonIndex) => (
                  <group key={moon.name}>
                    {createOrbit(moon.distance)}
                    <mesh ref={(el) => (moonRefs.current[moonIndex] = el)}>
                      <sphereGeometry args={[moon.radius, 32, 32]} />
                      <meshStandardMaterial color={moon.color} />
                    </mesh>
                  </group>
                ))}
              </group>
            ))}
          </group>
        );
      })}

      <OrbitControls />
    </>
  );
};

export default MultiStarSystem;
