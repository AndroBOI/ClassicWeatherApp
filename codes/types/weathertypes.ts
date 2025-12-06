interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  precipitation: string;
  wind_speed_10m: string;
}

interface Current {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  precipitation: number;
  wind_speed_10m: number;
}

interface HourlyUnits {
  time: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  precipitation: string;
  wind_speed_10m: string;
  weathercode: string;
}

interface Hourly {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  precipitation: number[];
  wind_speed_10m: number[];
  weathercode: number[];
}

interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  precipitation_sum: string;
  sunrise: string;
  sunset: string;
}

interface Daily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  sunrise: string[];
  sunset: string[];
}

interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: Current;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  daily_units: DailyUnits;
  daily: Daily;
}

export type { WeatherData, Current, CurrentUnits, Hourly, HourlyUnits, Daily, DailyUnits };