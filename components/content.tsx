"use client";
import { TailSpin } from "react-loader-spinner";
import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getWeather } from "@/scripts/getWeather";
import {
  WeatherResponse,
  DailyWeather,
  HourlyWeather,
} from "@/scripts/getWeather";


import DailyCard from "./daily-card";
import HourlyCard from "./hourly-card";

interface City {
  id: number;
  name: string;
  country: string;
  admin1: string;
  latitude: number;
  longitude: number;
}

const DEFAULT_CITY = {
  name: "Manila",
  admin1: "Metro Manila",
  country: "Philippines",
  latitude: 14.5995,
  longitude: 120.9842,
};

const Content = ({ value }: { value: boolean }) => {
  const [hourly, setHourly] = useState<HourlyWeather | null>(null);
  const [daily, setDaily] = useState<DailyWeather | null>(null);
  const [selectedCityData, setSelectedCityData] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [city, setCity] = useState("");
  const [cities, setCitiest] = useState<City[]>([]);
  const [showInputDropDown, setShowDropDown] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchCities = async (query: string): Promise<City[]> => {
    if (!query.trim()) return [];
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}`
      );

      const data: { results?: City[] } = await res.json();
      return data.results || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const formattedTime = (data: string) => {
    const date = new Date(data);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  const getDailyIcon = (index: number) => {
    const precip = daily?.precipitation_sum[index] ?? 0;

    if (precip === 0) return "/assets/images/icon-sunny.webp";
    if (precip > 0 && precip <= 2) return "/assets/images/icon-drizzle.webp";
    if (precip > 2) return "/assets/images/icon-rain.webp";
    return "/assets/images/icon-sunny.webp";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!city.trim()) {
      alert("Please enter a valid city");
      return;
    }

    setLoading(true);

    const results = await fetchCities(city);
    if (results.length === 0) {
      setLoading(false);
      return alert("Place not Found");
    }

    const selectedCity = results.find(
      (c) =>
        c.name.toLocaleLowerCase() === city.toLocaleLowerCase() || results[0]
    );

    if (!selectedCity) {
      alert("Place not found");
      return;
    }
    setSelectedCityData(
      `${selectedCity.name}, ${selectedCity.admin1}, ${selectedCity.country}`
    );
    const response = await getWeather(
      selectedCity.latitude,
      selectedCity.longitude
    );

    setWeather(response);
    setHourly(response?.hourly ?? null);
    setDaily(response?.daily ?? null);
    setShowDropDown(false);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setShowDropDown(true);
  };

  const formattedDate = (date?: string | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    const dateObj = typeof date === "string" ? new Date(date) : date;

    const formattedDateDate = new Intl.DateTimeFormat("en-us", options).format(
      dateObj
    );

    return formattedDateDate;
  };

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      setCity(DEFAULT_CITY.name);
      setSelectedCityData(
        `${DEFAULT_CITY.name}, ${DEFAULT_CITY.admin1}, ${DEFAULT_CITY.country}`
      );
      setLoading(true);
      const response = await getWeather(
        DEFAULT_CITY.latitude,
        DEFAULT_CITY.longitude
      );
      setWeather(response);
      setDaily(response?.daily ?? null);
      setHourly(response?.hourly ?? null);
      setLoading(false);
    };

    fetchDefaultWeather();
  }, []);

  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(async () => {
      const results = await fetchCities(city);
      setCitiest(results);
    }, 300);

    setDebounceTimer(timer);
    return () => clearTimeout(timer);
  }, [city]);

  return (
    <div className=" min-h-[100dvh]">
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col w-lg gap-3">
          <div className="flex w-full gap-3">
            <div className="relative w-[85%]">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

              <Input
                value={city}
                onChange={handleChange}
                placeholder="Search for a place..."
                className="pl-9 placeholder:text-[#ffffff8b] text-xs bg-[hsl(243,23%,24%)]"
              />

              {showInputDropDown && city && cities.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-1 bg-[hsl(243, 96%, 9%)] shadow-lg z-10 bg-[hsl(243,23%,24%)] p-2">
                  {cities.map((city) => (
                    <div
                      onClick={async () => {
                        setCity(city.name);
                        setSelectedCityData(
                          `${city.name}, ${city.admin1}, ${city.country}`
                        );
                        setShowDropDown(false);
                        setLoading(true);

                        const response = await getWeather(
                          city.latitude,
                          city.longitude
                        );
                        setHourly(response?.hourly ?? null);
                        setDaily(response?.daily ?? null);
                        setWeather(response);
                        setLoading(false);
                      }}
                      key={city.id}
                      className=" p-2 text-sm hover:border border-gray-400 cursor-pointer"
                    >
                      {city.name}, {city.admin1}, {city.country}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              className="w-[15%] flex justify-center"
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <div className="w-full flex justify-center">
                  {" "}
                  <TailSpin
                    strokeWidth={5}
                    visible={true}
                    height="450"
                    width="450"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
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
                  <div className="font-semibold text-lg ">
                    {selectedCityData}
                  </div>
                  <div className="font-light text-xs">
                    {formattedDate(weather?.current.time)}
                  </div>
                </div>
                <div className="flex items-center space-x-5">
                  <img
                    src="/assets/images/icon-sunny.webp"
                    alt=""
                    className="h-20 w-20"
                  />
                  <div className="text-6xl italic font-semibold">
                    {weather?.current.temperature_2m}°
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-5">
                <div className="bg-gray-700 h-[5rem] flex flex-col justify-center p-3 space-y-4 rounded-lg">
                  <div className="text-[0.7rem]">Feels Like</div>
                  <div className="text-lg flex items-center">
                    {loading ? (
                      <TailSpin
                        strokeWidth={5}
                        visible={true}
                        height="10"
                        width="10"
                        color="#fff"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    ) : (
                      weather?.current.temperature_2m
                    )}
                    <div>°</div>
                  </div>
                </div>
                <div className="bg-gray-700 h-[5rem] flex flex-col justify-center p-3 space-y-4 rounded-lg">
                  <div className="text-[0.7rem]">Humidity</div>
                  <div className="text-lg flex items-center">
                    {loading ? (
                      <TailSpin
                        strokeWidth={5}
                        visible={true}
                        height="10"
                        width="10"
                        color="#fff"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    ) : (
                      weather?.current.relative_humidity_2m
                    )}
                    <div>%</div>
                  </div>
                </div>
                <div className="bg-gray-700 h-[5rem] flex flex-col justify-center p-3 space-y-4 rounded-lg">
                  <div className="text-[0.7rem]">Wind</div>
                  <div className="text-lg flex items-center gap-x-2">
                    {loading ? (
                      <TailSpin
                        strokeWidth={5}
                        visible={true}
                        height="10"
                        width="10"
                        color="#fff"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    ) : (
                      weather?.current.wind_speed_10m
                    )}
                    <div>km/h</div>
                  </div>
                </div>
                <div className="bg-gray-700 h-[5rem] flex flex-col justify-center p-3 space-y-4 rounded-lg">
                  <div className="text-[0.7rem]">Percipitation</div>
                  <div className="text-lg flex items-center gap-x-2">
                    {loading ? (
                      <TailSpin
                        strokeWidth={5}
                        visible={true}
                        height="10"
                        width="10"
                        color="#fff"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    ) : (
                      weather?.current.precipitation
                    )}
                    <div>mm</div>
                  </div>
                </div>
              </div>
              <div>
                <div>Daily Forecast</div>
                <div className="grid grid-cols-7 gap-3 mt-5">
                  {daily?.time.map((day, index) => (
                    <DailyCard
                      key={index}
                      day={day}
                      max={daily.temperature_2m_max[index]}
                      min={daily.temperature_2m_min[index]}
                      precipitation={daily.precipitation_sum[index]}
                      getDailyIcon={getDailyIcon}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[30%] min-h-scree bg-gray-700 rounded-2xl p-5">
              <div>Hourly Forecast</div>
              <div className="space-y-5">
                {hourly?.time.map((hour, index) => (
                  <HourlyCard
                    key={index}
                    time={hourly.time[index]}
                    temp={hourly.temperature_2m[index]}
                    formattedTime={formattedTime} // ⬅️ pass function
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
