import express from 'express';
import axios from 'axios';
import cors from 'cors';


const app = express();
const port = 5000;
app.use(cors());

const API_KEY = 'f531bdb1d72d49e391b135501250205';
const WEATHER_API_URL = 'https://api.weatherapi.com/v1/current.json';

app.get('/weather', async (req, res) => {
  const location = req.query.location || 'Philippines'; 
  try {
    const { data } = await axios.get(WEATHER_API_URL, {
      params: {
        key: API_KEY,
        q: location,
      },
    });
    res.json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});


app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
