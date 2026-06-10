import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightSearchRequest } from '../models/flight-search-request';
import { FlightSearchResult } from '../models/flight-search-result';
import { BookingRequest } from '../models/booking-request';
import { BookingResponse } from '../models/booking-response';

@Injectable({ providedIn: 'root' })
export class FlightService {
  constructor(private http: HttpClient) {}

  // Shared static data moved to service so higher-level consumers can reuse
  getAirports() {
    return [
      { code: 'JFK', name: 'New York (JFK), USA', country: 'USA' },
      { code: 'LAX', name: 'Los Angeles (LAX), USA', country: 'USA' },
      { code: 'ORD', name: 'Chicago (ORD), USA', country: 'USA' },
      { code: 'LHR', name: 'London (LHR), UK', country: 'UK' },
      { code: 'CDG', name: 'Paris (CDG), France', country: 'France' },
      { code: 'DXB', name: 'Dubai (DXB), UAE', country: 'UAE' }
    ];
  }

  getCabinClasses() {
    return ['Economy', 'Business', 'First'];
  }

  getPassengerOptions() {
    return Array.from({ length: 9 }, (_, i) => i + 1);
  }

  getAirportCountryMap(): Record<string, string> {
    return {
      JFK: 'USA', LAX: 'USA', ORD: 'USA',
      LHR: 'UK', CDG: 'France', DXB: 'UAE'
    };
  }

  searchFlights(request: FlightSearchRequest): Observable<FlightSearchResult[]> {
    return this.http.post<FlightSearchResult[]>('https://localhost:44382/api/flights/search', request);
  }

  bookFlight(request: BookingRequest): Observable<BookingResponse> {
    return this.http.post<BookingResponse>('https://localhost:44382/api/flights/book', request);
  }
}
