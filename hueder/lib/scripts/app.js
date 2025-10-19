import { getGeolocation } from "./geolocation.js";
import { getWeather } from "./getWeather.js";
const input = document.getElementById("inputId");

document.getElementById("formId").addEventListener("submit", async (e) => {
  e.preventDefault()
  let value = input.value;
 
  const coords = await getGeolocation(value)

  if(coords) {
    await getWeather(coords.latitude, coords.longitude)
  }

  input.value = ""
});
