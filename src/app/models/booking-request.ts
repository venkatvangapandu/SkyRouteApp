import { FlightSearchResult } from './flight-search-result';

export interface PassengerInfo {
  fullName: string;
  email: string;
  documentNumber: string;
}

export interface BookingRequest {
  flight: FlightSearchResult;
  passengers: PassengerInfo[];
}