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

  searchFlights(request: FlightSearchRequest): Observable<FlightSearchResult[]> {
    return this.http.post<FlightSearchResult[]>('https://localhost:44382/api/flights/search', request);
  }

  bookFlight(request: BookingRequest): Observable<BookingResponse> {
    return this.http.post<BookingResponse>('https://localhost:44382/api/flights/book', request);
  }
}