export interface FlightSearchRequest {
  origin: string;
  destination: string;
  departureDate: string;
  passengers: number;
  cabinClass: string;
}