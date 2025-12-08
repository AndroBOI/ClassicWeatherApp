"use client";

import React, {
  useCallback,
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { WeatherData } from "@/types/weathertypes";
import { getGeoCoordinate } from "@/utilities/getCoordinates";
import { GeoLocation } from "@/types/geolocationtypes";

interface WeatherContextType {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleSearch: (query: string) => Promise<GeoLocation[]>;
  setCoordinates: (city: GeoLocation) => void;
  selectedCity: GeoLocation | null;
}
const WeatherContext = createContext<WeatherContextType>({
  weather: null,
  loading: true,
  error: null,
  searchValue: "",
  setSearchValue: () => {},
  handleSearch: async () => [],
  setCoordinates: () => {},
  selectedCity: null,
});

interface WeatherProviderProps {
  children: ReactNode;
  latitude: number;
  longitude: number;
}

export function WeatherProvider({
  children,
  latitude,
  longitude,
}: WeatherProviderProps) {
  const [selectedCity, setSelectedCity] = useState<GeoLocation>({
    name: "Seoul",
    country: "South Korea",
    latitude: 37.566,
    longitude: 126.978,
  });
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("Seoul");
  const [lat, setLat] = useState(latitude);
  const [lon, setLon] = useState(longitude);

  const setCoordinates = (city: GeoLocation) => {
    setLat(city.latitude);
    setLon(city.longitude);
    setSelectedCity(city);
  };
  const handleSearch = useCallback(
    async (query: string): Promise<GeoLocation[]> => {
      if (!query || query.trim().length < 2) return [];
      const results = await getGeoCoordinate(query);

      console.log("Search results:", results);
      return results;
    },
    []
  );

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weathercode&forecast_hours=8&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset&forecast_days=7&timezone=auto`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch weather data");
        const data: WeatherData = await response.json();
        setWeather(data);
        console.log(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        loading,
        error,
        searchValue,
        setSearchValue,
        handleSearch,
        setCoordinates,
        selectedCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}

export default WeatherContext;
