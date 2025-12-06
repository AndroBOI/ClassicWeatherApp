export interface GeoLocation {
  name: string;
  latitude: number;
  longitude: number;
  admin1?: string;
  country?: string;
}

export interface GeocodingResponse {
  results?: GeoLocation[];
}
