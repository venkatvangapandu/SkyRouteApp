import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlightSearchRequest } from '../../models/flight-search-request';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent {
  @Output() search = new EventEmitter<FlightSearchRequest>();
  @Input() loading = false;
  airports = [
    { code: 'JFK', name: 'New York (JFK), USA', country: 'USA' },
    { code: 'LAX', name: 'Los Angeles (LAX), USA', country: 'USA' },
    { code: 'ORD', name: 'Chicago (ORD), USA', country: 'USA' },
    { code: 'LHR', name: 'London (LHR), UK', country: 'UK' },
    { code: 'CDG', name: 'Paris (CDG), France', country: 'France' },
    { code: 'DXB', name: 'Dubai (DXB), UAE', country: 'UAE' }
  ];
  cabinClasses = ['Economy', 'Business', 'First'];
  passengerOptions = Array.from({ length: 9 }, (_, i) => i + 1);

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      departureDate: ['', Validators.required],
      passengers: ['', [Validators.required, Validators.min(1), Validators.max(9)]],
      cabinClass: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      this.search.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}