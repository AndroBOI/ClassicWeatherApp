import  { useState } from 'react';

interface WeatherData {
  location: { name: string; country: string };
  current: { temp_c: number; condition: { text: string } };
}

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      const specificLoc = encodeURIComponent(location);
      const response = await fetch(`http://localhost:5000/weather?location=${specificLoc}`);
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch weather data');
      setWeather(null);
    }
  };

  return (
    <div>
      <h1>Weather Finder</h1>
      <input
        type="text"
        placeholder="e.g., Los Angeles, California, USA"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
        </div>
      )}
    </div>
  );
}

export default App;
