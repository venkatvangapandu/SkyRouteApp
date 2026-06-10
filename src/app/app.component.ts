import { ChangeDetectorRef, Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { FlightResultsComponent } from './components/flight-results/flight-results.component';
import { BookingComponent } from './components/booking/booking.component';
import { FlightSearchRequest } from './models/flight-search-request';
import { FlightSearchResult } from './models/flight-search-result';
import { BookingRequest } from './models/booking-request';
import { BookingResponse } from './models/booking-response';
import { FlightService } from './services/flight.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    FlightSearchComponent,
    FlightResultsComponent,
    BookingComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  results: FlightSearchResult[] = [];
  selectedFlight: FlightSearchResult | null = null;
  bookingResponse: BookingResponse | null = null;
  loading = false;
  passengersCount = 1;
  errorMessage = '';
  hasSearched = false;

  constructor(private flightService: FlightService, private cdr: ChangeDetectorRef) { }

  onSearch(request: FlightSearchRequest) {
    this.loading = true;
    this.hasSearched = true;
    this.flightService.searchFlights(request).subscribe({
      next: (res) => {
        this.results = [...res];
        this.selectedFlight = null;
        this.bookingResponse = null;
        this.loading = false;
        this.passengersCount = request.passengers;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.results = [];
        this.errorMessage = 'Failed to load flights. Please check your backend API.';
        this.cdr.detectChanges();
      }
    });
  }

  onSelectFlight(flight: FlightSearchResult) {
    this.selectedFlight = flight;
    this.bookingResponse = null;
  }

  onBook(request: BookingRequest) {
    this.flightService.bookFlight(request).subscribe((res: BookingResponse | null) => {
      this.bookingResponse = res;
    });
  }
}