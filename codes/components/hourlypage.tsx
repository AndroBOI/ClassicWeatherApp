"use client";
import getDayName from "@/utilities/getDayName";
import { useWeather } from "@/contexts/WeatherContext";
import formatHour from "@/utilities/formatHour";

import { Sun, CloudSunRain, CloudDrizzle, CloudRain } from "lucide-react";

const HourlyPage = () => {
  const { weather, loading, error } = useWeather();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!weather) return <div>No weather data</div>;

  const { hourly } = weather;
  const hourlyCount = hourly.time.length;

  const getPrecipitationIcon = (value: number) => {
    if (value === 0) return <Sun />;
    if (value <= 3) return <CloudSunRain />;
    if (value <= 10) return <CloudDrizzle />;
    return <CloudRain />;
  };

  return (
    <div className="min-h-dvh  p-4 space-y-4 flex flex-col justify-center">
      {Array.from({ length: hourlyCount }).map((_, i) => (
        <div
          key={i}
          className="p-3 border rounded shadow flex justify-between items-center"
        >
          <div>{formatHour(hourly.time[i])}</div>
          <div className="flex gap-x-3 items-center">
            <div>{hourly.temperature_2m[i].toFixed(1)}<span className="text-4xl">°</span></div>
            <div>{getPrecipitationIcon(hourly.precipitation[i])}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HourlyPage;
