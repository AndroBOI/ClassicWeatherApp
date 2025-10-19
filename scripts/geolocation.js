export const getGeolocation = async (place) => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(place)}&count=1`
    );

    if (!response.ok) {
      throw new Error("Network Error: " + response.status);
    }

    const data = await response.json();

    const coordinates = {
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude
    }

    return coordinates
  } catch (error) {
    console.error("Fetch failed:", error);
  }
};
