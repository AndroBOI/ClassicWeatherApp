"use client";
import { TailSpin } from "react-loader-spinner";
import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getWeather } from "@/scripts/getWeather";

interface City {
  id: number;
  name: string;
  country: string;
  admin1: string;
  latitude: number;
  longitude: number;
}

const Content = ({ value }: { value: boolean }) => {
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

    await getWeather(selectedCity.latitude, selectedCity.longitude);
    setShowDropDown(false);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setShowDropDown(true);
  };

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
                      onClick={() => getWeather(city.latitude, city.longitude)}
                      key={city.id}
                      className=" p-2 text-sm hover:border border-gray-400 cursor-pointer"
                    >
                      {city.name}, {city.admin1}, {city.country}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button className="w-[15%] flex justify-center" disabled={loading} type="submit">
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
                  <div className="text-[0.7rem]">Feels Like</div>
                  <div className="text-lg">64°</div>
                </div>
                <div className="bg-gray-700 h-[5rem] flex flex-col justify-center p-3 space-y-4 rounded-lg">
                  <div className="text-[0.7rem]">Humidity</div>
                  <div className="text-lg">46%</div>
                </div>
                <div className="bg-gray-700 h-[5rem] flex flex-col justify-center p-3 space-y-4 rounded-lg">
                  <div className="text-[0.7rem]">Wind</div>
                  <div className="text-lg">9 mph</div>
                </div>
                <div className="bg-gray-700 h-[5rem] flex flex-col justify-center p-3 space-y-4 rounded-lg">
                  <div className="text-[0.7rem]">Percipitation</div>
                  <div className="text-lg">0 in</div>
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
