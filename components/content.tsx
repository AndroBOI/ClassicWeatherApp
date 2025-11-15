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
    <div className=" min-h-[100dvh]">
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

        <div className="flex justify-center items-center">
          <div className="container flex  space-x-5 ">
            <div className="w-[70%] space-y-5">
              <div
                className="bg-cover bg-center h-[230px] flex justify-between items-center p-5 rounded-2xl"
                style={{
                  backgroundImage: `url(/assets/images/bg-today-large.svg)`,
                }}
              >
                <div>
                  <div className="font-semibold text-lg ">Berlin, Germany</div>
                  <div className="font-light text-xs">Tuesday, Aug 6 2025</div>
                </div>
                <div className="flex items-center space-x-5">
                  <img
                    src="/assets/images/icon-sunny.webp"
                    alt=""
                    className="h-20 w-20"
                  />
                  <div className="text-6xl italic font-semibold">68°</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-5">
                <div className="bg-gray-700 h-[5rem] flex flex-col justify-center p-3 space-y-4 rounded-lg">
                  {" "}
                  <div className="text-[0.7rem]">Feels Like</div>{" "}
                  <div className="text-lg">64°</div>{" "}
                </div>{" "}
                <div className="bg-gray-700 h-[5rem] flex flex-col justify-center p-3 space-y-4 rounded-lg">
                  {" "}
                  <div className="text-[0.7rem]">Humidity</div>{" "}
                  <div className="text-lg">46%</div>{" "}
                </div>{" "}
                <div className="bg-gray-700 h-[5rem] flex flex-col justify-center p-3 space-y-4 rounded-lg">
                  {" "}
                  <div className="text-[0.7rem]">Wind</div>{" "}
                  <div className="text-lg">9 mph</div>{" "}
                </div>{" "}
                <div className="bg-gray-700 h-[5rem] flex flex-col justify-center p-3 space-y-4 rounded-lg">
                  {" "}
                  <div className="text-[0.7rem]">Percipitation</div>{" "}
                  <div className="text-lg">0 in</div>{" "}
                </div>
              </div>
              <div>
                <div>Daily Forecast</div>
                <div className="grid grid-cols-7 gap-3 mt-5">
                  <div className="rounded-md bg-gray-700 h-[9rem] p-3 flex flex-col justify-center items-center space-y-5">
                    <div>Tue</div>
                    <div>
                      <img
                        className="h-10 w-10"
                        src="/assets/images/icon-rain.webp"
                        alt=""
                      />
                    </div>
                    <div className="flex text-xs justify-between w-full">
                      <div>68°</div>
                      <div>57°</div>
                    </div>
                  </div>
                  <div className="rounded-md bg-gray-700 h-[9rem] p-3 flex flex-col justify-center items-center space-y-5">
                    <div>Tue</div>
                    <div>
                      <img
                        className="h-10 w-10"
                        src="/assets/images/icon-rain.webp"
                        alt=""
                      />
                    </div>
                    <div className="flex text-xs justify-between w-full">
                      <div>68°</div>
                      <div>57°</div>
                    </div>
                  </div>
                  <div className="rounded-md bg-gray-700 h-[9rem] p-3 flex flex-col justify-center items-center space-y-5">
                    <div>Tue</div>
                    <div>
                      <img
                        className="h-10 w-10"
                        src="/assets/images/icon-rain.webp"
                        alt=""
                      />
                    </div>
                    <div className="flex text-xs justify-between w-full">
                      <div>68°</div>
                      <div>57°</div>
                    </div>
                  </div>
                  <div className="rounded-md bg-gray-700 h-[9rem] p-3 flex flex-col justify-center items-center space-y-5">
                    <div>Tue</div>
                    <div>
                      <img
                        className="h-10 w-10"
                        src="/assets/images/icon-rain.webp"
                        alt=""
                      />
                    </div>
                    <div className="flex text-xs justify-between w-full">
                      <div>68°</div>
                      <div>57°</div>
                    </div>
                  </div>
                  <div className="rounded-md bg-gray-700 h-[9rem] p-3 flex flex-col justify-center items-center space-y-5">
                    <div>Tue</div>
                    <div>
                      <img
                        className="h-10 w-10"
                        src="/assets/images/icon-rain.webp"
                        alt=""
                      />
                    </div>
                    <div className="flex text-xs justify-between w-full">
                      <div>68°</div>
                      <div>57°</div>
                    </div>
                  </div>
                  <div className="rounded-md bg-gray-700 h-[9rem] p-3 flex flex-col justify-center items-center space-y-5">
                    <div>Tue</div>
                    <div>
                      <img
                        className="h-10 w-10"
                        src="/assets/images/icon-rain.webp"
                        alt=""
                      />
                    </div>
                    <div className="flex text-xs justify-between w-full">
                      <div>68°</div>
                      <div>57°</div>
                    </div>
                  </div>
                  <div className="rounded-md bg-gray-700 h-[9rem] p-3 flex flex-col justify-center items-center space-y-5">
                    <div>Tue</div>
                    <div>
                      <img
                        className="h-10 w-10"
                        src="/assets/images/icon-rain.webp"
                        alt=""
                      />
                    </div>
                    <div className="flex text-xs justify-between w-full">
                      <div>68°</div>
                      <div>57°</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[30%] min-h-scree bg-gray-700 rounded-2xl p-5">
              <div>Hourly Forecast</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
