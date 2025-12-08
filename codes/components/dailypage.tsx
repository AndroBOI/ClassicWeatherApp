'use client'

import React from 'react'
import { useWeather } from '@/contexts/WeatherContext'

const DailyPage = () => {
  const { weather, loading, error } = useWeather()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!weather) return <div>No weather data</div>

  const { daily } = weather
  const daysCount = daily.time.length

  return (
    <div className="min-h-screen p-4 space-y-4">
      {Array.from({ length: daysCount }).map((_, i) => (
        <div key={i} className="p-4 border rounded shadow">
          <div className="font-bold">{daily.time[i]}</div>
          <div>Max Temp: {daily.temperature_2m_max[i]}°C</div>
          <div>Min Temp: {daily.temperature_2m_min[i]}°C</div>
          <div>Precipitation: {daily.precipitation_sum[i]} mm</div>
          <div>Sunrise: {new Date(daily.sunrise[i]).toLocaleTimeString()}</div>
          <div>Sunset: {new Date(daily.sunset[i]).toLocaleTimeString()}</div>
        </div>
      ))}
    </div>
  )
}

export default DailyPage
