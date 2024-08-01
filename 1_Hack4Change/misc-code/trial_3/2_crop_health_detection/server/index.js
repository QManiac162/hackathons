// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/crophealth', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schema and model
const cropDataSchema = new mongoose.Schema({
  sensorId: String,
  temperature: Number,
  humidity: Number,
  timestamp: Date,
  healthStatus: String
});

const CropData = mongoose.model('CropData', cropDataSchema);

// API endpoint to receive CSV data and save it
app.post('/api/data', async (req, res) => {
  try {
    // Assuming CSV data is parsed and sent in req.body
    const data = req.body;
    await CropData.insertMany(data);
    res.status(201).send('Data saved successfully');
  } catch (error) {
    res.status(500).send('Error saving data');
  }
});

// API endpoint to fetch crop data
app.get('/api/data', async (req, res) => {
  try {
    const data = await CropData.find();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
