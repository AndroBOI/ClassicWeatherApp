"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { WeatherData } from "@/types/weathertypes";

interface WeatherContextType {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const WeatherContext = createContext<WeatherContextType>({
  weather: null,
  loading: true,
  error: null,
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
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=37.566&longitude=126.978&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weathercode&forecast_hours=8&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset&forecast_days=7&timezone=auto`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch weather data");
        const data: WeatherData = await response.json();
        setWeather(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  return (
    <WeatherContext.Provider value={{ weather, loading, error }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}

export default WeatherContext;
