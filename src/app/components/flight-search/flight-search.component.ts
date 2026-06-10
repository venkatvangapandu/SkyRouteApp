import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlightSearchRequest } from '../../models/flight-search-request';
import { NgFor, NgIf } from '@angular/common';
import { FlightService } from '../../services/flight.service';

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
  airports: any[] = [];
  cabinClasses: string[] = [];
  passengerOptions: number[] = [];

  form: FormGroup;

  constructor(private fb: FormBuilder, private flightService: FlightService) {
    this.form = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      departureDate: ['', Validators.required],
      passengers: ['', [Validators.required, Validators.min(1), Validators.max(9)]],
      cabinClass: ['', Validators.required]
    });
    this.airports = this.flightService.getAirports();
    this.cabinClasses = this.flightService.getCabinClasses();
    this.passengerOptions = this.flightService.getPassengerOptions();
  }

  submit() {
    if (this.form.valid) {
      this.search.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
