import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FlightSearchResult } from '../../models/flight-search-result';
import { NgFor, NgIf } from '@angular/common';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-flight-results',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, CurrencyPipe],
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.scss']
})
export class FlightResultsComponent {
  @Input() results: FlightSearchResult[] = [];
  @Input() loading: boolean = false;
  @Input() hasSearched: boolean = false;
  @Output() selectFlight = new EventEmitter<FlightSearchResult>();

  sortField
    : string = 'pricePerPassenger';
  sortDirection: 'asc' | 'desc' = 'asc';

  get sortedResults(): FlightSearchResult[] {
    let sorted = [...this.results];
    sorted.sort((a, b) => {
      let valA: any, valB: any;
      switch (this.sortField) {
        case 'pricePerPassenger':
          valA = a.pricePerPassenger; valB = b.pricePerPassenger; break;
        case 'duration':
          valA = a.duration; valB = b.duration; break;
        case 'departureTime':
          valA = a.departureTime; valB = b.departureTime; break;
        default:
          valA = a.pricePerPassenger; valB = b.pricePerPassenger;
      }
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }

  setSort(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }
}