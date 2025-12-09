"use client";
import getDayName from "@/utilities/getDayName";
import { useWeather } from "@/contexts/WeatherContext";
import formatFullDate from "@/utilities/getFormatFullDate";

import { Sun, CloudSunRain, CloudDrizzle, CloudRain } from "lucide-react";

const DailyPage = () => {
  const { weather, loading, error } = useWeather();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!weather) return <div>No weather data</div>;

  const { daily } = weather;
  const daysCount = daily.time.length;

  const getPrecipitationIcon = (value: number) => {
    if (value === 0) return <Sun />;
    if (value <= 3) return <CloudSunRain />;
    if (value <= 10) return <CloudDrizzle />;
    return <CloudRain />;
  };

  return (
    <div className="min-h-screen p-4 space-y-4 flex flex-col justify-center">
      {Array.from({ length: daysCount }).map((_, i) => (
        <div key={i} className="p-3 border rounded shadow flex justify-between items-center">
          <div>
            <div>{formatFullDate(daily.time[i])}</div>
            <div className="font-bold">{getDayName(daily.time[i])}</div>
          </div>
          <div>{getPrecipitationIcon(daily.precipitation_sum[i])}</div>
        </div>
      ))}
    </div>
  );
};

export default DailyPage;
