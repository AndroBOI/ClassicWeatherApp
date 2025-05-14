import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';


const app = express();
const port = 5000;
app.use(cors());

const API_KEY = 'f531bdb1d72d49e391b135501250205';
const WEATHER_API_URL = 'https://api.weatherapi.com/v1/forecast.json';

interface sevenDayForecast {
  date:string;
  condition: string;
  humidity: number;
  temperature: {
    max: number;
    min: number;
  }
}

interface apiForecastResponse {
  forecast: {
    forecastday: {
      date: string;
      day: {
        condition: {
          text: string;
        };
        avghumidity: number;
        maxtemp_c: number;
        mintemp_c: number;
      }
    }[]
  }
}

app.get('/weather', async(req: Request, res: Response) => {
  const location = req.query.location || 'San Fabian, Pangasinan, Philippines'; 
  try {

    const response = await axios.get(WEATHER_API_URL, {
      params: {
         key: API_KEY,
        q: location,
      }
       
    })
    res.json(response.data)
  } catch (error) {
     console.error('Error fetching current weather:', error);
    res.status(500).json({ error: 'Failed to fetch current weather' });
  }

})

app.get('/forecast', async (req: Request, res: Response) => {
  const location = req.query.location || 'San Fabian, Pangasinan, Philippines'; 

  try {
    const { data }: {data: apiForecastResponse} = await axios.get(WEATHER_API_URL, {
      params: {
        key: API_KEY,
        q: location,
        days: 7
      },
    });

    const forecastData: sevenDayForecast[] = data.forecast.forecastday.map((day) => ({
      date: day.date,
      condition: day.day.condition.text,
      humidity: day.day.avghumidity,
      temperature: {
        max: day.day.maxtemp_c,
        min: day.day.mintemp_c
      }
    }))


    res.json(forecastData);
    
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});


app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
