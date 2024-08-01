import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [features, setFeatures] = useState([]);
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFeatures({ ...features, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:5000/predict', { features })
      .then(response => setPrediction(response.data.prediction))
      .catch(error => console.error(error));
  };

  return (
    <div className="App">
      <h1>Crop Yield Prediction</h1>
      <form>
        {/* Add input fields for each feature */}
        <input type="text" name="feature1" onChange={handleChange} placeholder="Feature 1" />
        <input type="text" name="feature2" onChange={handleChange} placeholder="Feature 2" />
        {/* Add more fields as needed */}
        <button type="button" onClick={handleSubmit}>Predict</button>
      </form>
      {prediction && <h2>Predicted Yield: {prediction}</h2>}
    </div>
  );
}

export default App;
