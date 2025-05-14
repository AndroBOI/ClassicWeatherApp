import { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { getWeatherBackground } from '../Utils/weatherColor';

interface SevenDayForecast {
  date: string;
  condition: string;
  humidity: number;
  temperature: {
    max: number;
    min: number;
  };
}

interface CurrentWeatherType {
  location: { name: string; country: string };
  current: { temp_c: number; condition: { text: string } };
}

function App() {
  const [location, setLocation] = useState('');
  const [forecast, setForecast] = useState<SevenDayForecast[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherType | null>(null);

  const glassStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: '20px',
    color: 'whitesmoke',
    textAlign: 'center',
    minWidth: '160px',
  };

  const backgroundStyle = getWeatherBackground(currentWeather?.current.condition.text || 'sunny');

  const fetchWeather = async () => {
    try {
      const specificLoc = encodeURIComponent(location);

      const [currentWeather, forecastWeather] = await Promise.all([
        fetch(`http://localhost:5000/weather?location=${specificLoc}`),
        fetch(`http://localhost:5000/forecast?location=${specificLoc}`),
      ]);

      const currentData = await currentWeather.json();
      const forecastData = await forecastWeather.json();

      setCurrentWeather(currentData);
      setForecast(forecastData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch weather data');
      setCurrentWeather(null);
      setForecast(null);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        background: backgroundStyle?.gradient,
        color: 'whitesmoke',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          flexDirection: 'column',
          margin: '0',
          padding: '0',
        }}
      >
        <TextField
          variant="standard"
          type="text"
          placeholder="e.g., Los Angeles, California, USA"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{
            input: { color: 'whitesmoke' },
            label: { color: 'whitesmoke' },
            '& .MuiInput-underline:before': { borderBottomColor: 'whitesmoke' },
            '& .MuiInput-underline:after': { borderBottomColor: 'whitesmoke' },
          }}
        />
        <Button onClick={fetchWeather} variant="outlined" sx={{ color: 'whitesmoke', borderColor: 'whitesmoke' }}>
          Get Weather
        </Button>
      </Box>

      {error && <p>{error}</p>}

      {currentWeather && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          <h2>{currentWeather.location.name}, {currentWeather.location.country}</h2>
          <p>
            {new Date().toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p>
            <strong>Now:</strong> {currentWeather.current.temp_c}°C,{' '}
            {currentWeather.current.condition.text}
          </p>
        </div>
      )}

      {forecast && (
          <div style={{ marginTop: '30px', overflowX: 'auto', width: '100%' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                whiteSpace: 'nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                padding: '0 10px',
              }}
            >
              {forecast.map((day, i) => (
                <Box key={i} sx={{ ...glassStyle, padding: '10px', minWidth: '130px' }}>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '0.9rem' }}>
                    {new Date(day.date).toLocaleDateString(undefined, {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </h4>
                  <p style={{ margin: '2px 0', fontSize: '0.8rem' }}>{day.condition}</p>
                  <p style={{ margin: '2px 0', fontSize: '0.75rem' }}>💧 {day.humidity}%</p>
                  <p style={{ margin: '2px 0', fontSize: '0.75rem' }}>
                    🌡 {day.temperature.min}° / {day.temperature.max}°
                  </p>
                </Box>
              ))}
            </div>
          </div>
        )}

    </div>
  );
}

export default App;
