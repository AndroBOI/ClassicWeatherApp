"use client"

import { useWeather } from "@/contexts/WeatherContext";

const HomePage = () => {
  const { weather, loading, error } = useWeather();

  if (loading)
    return (
      <div className="bg-red-400 w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="bg-red-400 w-full h-full flex items-center justify-center">
        Error: {error}
      </div>
    );
  if (!weather)
    return (
      <div className="bg-red-400 w-full h-full flex items-center justify-center">
        No weather data
      </div>
    );

  const { current } = weather;

  return (
    <div className="bg-red-400 w-full h-full flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold">Current Weather</h1>
      <p>Temperature: {current.temperature_2m}°C</p>
      <p>Humidity: {current.relative_humidity_2m}%</p>
      <p>Wind Speed: {current.wind_speed_10m} m/s</p>
      <p>Time: {new Date(current.time).toLocaleTimeString()}</p>
    </div>
  );
};

export default HomePage;
