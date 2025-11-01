export const getWeather = async (latitude, longitude) => {
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);

    if(!response.ok) throw new Error("Network Error: "+ response.status)

    const data = await response.json()

    return data

  } catch (error) {
    console.log("Get Weather Error");
  }
};
