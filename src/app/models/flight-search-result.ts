export interface FlightSearchResult {
  provider: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  cabinClass: string;
  pricePerPassenger: number;
  totalPrice: number;
}