import React, {useState} from 'react';
import "./CropHealth.css";

const Crop_Health = () => {

  const [formData, setFormData] = useState({
    temperature: '',
    ph: '',
    humidity: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data
    console.log('Form Data:', formData);
    // Add your processing logic here (e.g., send data to an API)
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="crop-health-form">
      <div>
        <label htmlFor="temperature">Temperature:</label>
        <input
          type="number"
          id="temperature"
          name="temperature"
          value={formData.temperature}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="ph">pH:</label>
        <input
          type="number"
          step="0.01"
          id="ph"
          name="ph"
          value={formData.ph}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="humidity">Humidity:</label>
        <input
          type="number"
          id="humidity"
          name="humidity"
          value={formData.humidity}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  )
}

export default Crop_Health