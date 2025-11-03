"use client";

import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getWeatherNow } from "@/scripts/getWeather";

interface WeatherData {
  location: {
    name: string; // e.g. "Toronto"
    region: string; // e.g. "Ontario"
    country: string; // e.g. "Canada"
    latitude: number;
    longitude: number;
    timezone: string; // e.g. "America/Toronto"
  };
  current: {
    temperature: number;
    humidity: number;
    precipitation: number;
    wind_speed: number;
    time: string; // ISO time (e.g. "2025-11-03T09:00")
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    sunrise: string[];
    sunset: string[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    precipitation: number[];
    wind_speed_10m: number[];
    weathercode: number[];
  };
}

const Content = ({ value }: { value: boolean }) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await getWeatherNow(city);
      setWeather(data);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex w-lg gap-3">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for a place..."
              className="pl-9 placeholder:text-[#ffffff8b] text-xs"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      <div className="mt-4">
        {value ? (
          <div className="text-green-600">Value is True</div>
        ) : (
          <div className="text-red-600">Value is False</div>
        )}

        <div className="flex justify-center ">
          <div className="container flex">
            <div className="w-[60%]">
              <div className="bg-red-300 h-[160px]">
                <div>
                  {weather?.location.name}, {weather?.location.country}
                </div>
              </div>
              <div className="flex gap-5">
                <div>{weather?.current.temperature}</div>
                <div>{weather?.current.humidity}</div>
                <div>{weather?.current.wind_speed}</div>
                <div>{weather?.current.precipitation}</div>
              </div>
              <div>
                <div>Daily Forecast</div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
