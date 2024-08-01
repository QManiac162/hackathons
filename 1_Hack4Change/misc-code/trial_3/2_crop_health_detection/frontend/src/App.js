import logo from './logo.svg';
import './App.css';

// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function App() {
  const [data, setData] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:5000/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data', error));
  }, []);

  useEffect(() => {
    if (data.length) {
      checkAlerts(data);
    }
  }, [data]);

  // Function to check for alert conditions
  const checkAlerts = (data) => {
    const newAlerts = data.filter(d => d.healthStatus === 'unhealthy' || d.temperature > 35 || d.humidity < 20);
    if (newAlerts.length > 0) {
      setAlerts(newAlerts);
      notifyUser(newAlerts);
    }
  };

  // Function to notify the user
  const notifyUser = (alerts) => {
    alerts.forEach(alert => {
      alert(`Alert: Unhealthy crop detected at sensor ${alert.sensorId}. Details: Temperature: ${alert.temperature}, Humidity: ${alert.humidity}`);
    });
  };

  return (
    <div className="App">
      <h1>Crop Health Dashboard</h1>
      {alerts.length > 0 && (
        <div className="alert-box">
          <h2>Alerts</h2>
          <ul>
            {alerts.map((alert, index) => (
              <li key={index}>
                Sensor {alert.sensorId}: Unhealthy - Temperature: {alert.temperature}, Humidity: {alert.humidity}
              </li>
            ))}
          </ul>
        </div>
      )}
      <LineChart width={1000} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
        <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}

export default App;

