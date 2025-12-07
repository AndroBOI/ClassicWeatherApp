"use client";

import { useWeather } from "@/contexts/WeatherContext";
import SearchBar from "./searchbar";
import { Droplets, Wind, Flame, Sun, Snowflake } from "lucide-react";
import formattedTime from "@/utilities/formattedTime";

const HomePage = () => {
  const { weather, loading, error } = useWeather();

  if (loading)
    return (
      <div className=" w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className=" w-full h-full flex items-center justify-center">
        Error: {error}
      </div>
    );
  if (!weather)
    return (
      <div className=" w-full h-full flex items-center justify-center">
        No weather data
      </div>
    );

  const { current } = weather;

  return (
    <div className=" border-2 min-h-dvh  grid grid-rows-[2fr_6fr]  items-center p-5">
      <div className="mt-[3rem] h-full">
        <SearchBar />
      </div>
      <div className="h-full flex flex-col justify-between items-center">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex justify-center items-center gap-5">
            {current.temperature_2m >= 35 ? (
              <Flame size={60} />
            ) : current.temperature_2m <= 19 ? (
              <Snowflake size={60} />
            ) : (
              <Sun size={60} />
            )}
            <p className="text-8xl">{current.temperature_2m}°</p>
          </div>

          <p>{formattedTime(weather.timezone)}</p>
        </div>
        <div className="flex space-x-10">
          <p className="flex gap-3">
            <Droplets /> {current.relative_humidity_2m}%
          </p>
          <p className="flex gap-3">
            <Wind /> {current.wind_speed_10m} m/s
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
