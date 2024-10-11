// import tx1 from "./textures/2k_jupiter.jpg"
// import tx2 from "./textures/2k_mars.jpg"
// import tx3 from "./textures/2k_mercury.jpg"
// import tx4 from "./textures/2k_neptune.jpg"
// import tx5 from "./textures/2k_saturn.jpg"
// import tx6 from "./textures/2k_uranus.jpg"

// const random = (a, b) => a + Math.random() * b;
// const randomInt = (a, b) => Math.floor(random(a, b));
// const randomColor = () =>
//   `rgb(${randomInt(80, 50)}, ${randomInt(80, 50)}, ${randomInt(80, 50)})`;

// const shuffle = (a) => {
//     const temp = a.slice(0);
//     for (let i = temp.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [temp[i], temp[j]] = [temp[j], temp[i]];
//     }
//     return temp;
//   };
// const textures = shuffle([tx1, tx2, tx3, tx4, tx5, tx6]);
// const planetData = [];
// const totalPlanets = 6;
// for (let index = 0; index < totalPlanets; index++) {
//     planetData.push({
//       id: index,
//       color: randomColor(),
//       xRadius: (index + 1.5) * 4,
//       zRadius: (index + 1.5) * 2,
//       size: random(0.5, 1),
//       speed: random(0.1, 0.6),
//       offset: random(0, Math.PI * 2),
//       rotationSpeed: random(0.01, 0.03),
//       textureMap: textures[index],
//       name: (Math.random() + 1).toString(36).substring(7).toUpperCase()
//     });
// }

// export default planetData;

import starSystemsData from './test.json'; 
const random = (a, b) => a + Math.random() * b;
const randomInt = (a, b) => Math.floor(random(a, b));
const randomColor = () =>
  `rgb(${randomInt(80, 50)}, ${randomInt(80, 50)}, ${randomInt(80, 50)})`;

// Initialize an empty array to store planet data
const planetData = [];

// Loop through the star systems and extract planets
starSystemsData.starSystems.forEach((system) => {
  system.planets.forEach((planet, index) => {
    planetData.push({
      id: index,
      color: randomColor(),
      xRadius: planet.xRadius || (index + 1.5) * 4,
      zRadius: planet.zRadius || (index + 1.5) * 2,
      size: planet.size || random(0.5, 1),
      speed: planet.orbitalSpeed || random(0.1, 0.6),
      offset: planet.orbitalOffset || random(0, Math.PI * 2),
      rotationSpeed: planet.rotationSpeed || random(0.01, 0.03),
      name: planet.name,
    });
  });
});

export default planetData;
