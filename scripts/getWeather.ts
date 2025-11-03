export const getWeatherNow = async (city: string) => {
  try {
    // 1️⃣ Step: Get latitude, longitude, and country
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found");
    }

    const { latitude, longitude, name, country, admin1, timezone } = geoData.results[0];

    // 2️⃣ Step: Fetch weather for those coordinates
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weathercode&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset&timezone=auto`
    );
    const weatherData = await weatherRes.json();

    // 3️⃣ Step: Merge and return clean object
    return {
      location: {
        name,
        region: admin1,
        country,
        latitude,
        longitude,
        timezone,
      },
      current: {
        temperature: weatherData.current?.temperature_2m,
        humidity: weatherData.current?.relative_humidity_2m,
        precipitation: weatherData.current?.precipitation,
        wind_speed: weatherData.current?.wind_speed_10m,
        time: weatherData.current?.time,
      },
      daily: weatherData.daily,
      hourly: weatherData.hourly,
    };
  } catch (error) {
    console.error("Get Weather Error:", error);
    return null;
  }
};
