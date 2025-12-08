import { GeocodingResponse, GeoLocation } from "@/types/geolocationtypes";

export const getGeoCoordinate = async (
  place: string,
  count: number = 7
): Promise<GeoLocation[]> => {
  if (!place || place.trim().length === 0) return [];

  try {
    const encodedPlace = encodeURIComponent(place.trim());
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodedPlace}&count=${count}&language=en&format=json`;

    const response = await fetch(url);

    if (!response.ok)
      throw new Error(`Geocoding API error: ${response.status}`);

    const data: GeocodingResponse = await response.json();
    console.log("data: " + data.results);
    return data.results || [];
  } catch (err) {
    console.error("Failed to fetch geo coordinates: ", err);
    throw err instanceof Error ? err : new Error("An error occured");
  }
};
