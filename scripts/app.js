import { getGeolocation } from "./geolocation.js";
import { getWeather } from "./getWeather.js";


export const getWeatherNow = async (value) => {
  
 
  const coords = await getGeolocation(value)

  if(coords) {
    const data = await getWeather(coords.latitude, coords.longitude)
    return data
  }


};
