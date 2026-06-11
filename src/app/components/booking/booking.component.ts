import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { FlightSearchResult } from '../../models/flight-search-result';
import { BookingRequest } from '../../models/booking-request';
import { FlightService } from '../../services/flight.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, DatePipe, CurrencyPipe],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnChanges {
  @Input() flight: FlightSearchResult | null = null;
  @Input() passengersCount: number = 1;
  @Output() book = new EventEmitter<BookingRequest>();

  form: FormGroup;

  airportCountryMap: Record<string, string> = {};

  constructor(private fb: FormBuilder, private flightService: FlightService) {
    this.form = this.fb.group({
      passengers:
        this.fb.array([])
    });
    this.airportCountryMap = this.flightService.getAirportCountryMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['passengersCount'] && this.passengersCount > 0) {
      this.setPassengers(this.passengersCount);
    }
    if (changes['flight']) {
      this.updateDocumentValidators();
    }
  }

  get passengers(): FormArray {
    return this.form.get('passengers') as FormArray;
  }

  setPassengers(count: number) {
    this.passengers.clear();
    for (let i = 0; i < count; i++) {
      this.passengers.push(this.fb.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        documentNumber: ['', [Validators.required]]
      }));
    }
    this.updateDocumentValidators();
  }

  get isInternational(): boolean {
    if (!this.flight) return false;
    const originCountry = this.airportCountryMap[this.flight.origin];
    const destCountry = this.airportCountryMap[this.flight.destination];
    return Boolean(originCountry && destCountry && originCountry !== destCountry);
  }

  get documentLabel(): string {
    return this.isInternational ? 'Passport Number' : 'National ID';
  }

  passportValidator: ValidatorFn = (control: AbstractControl) => {
    return /^[A-Z0-9]{12}$/i.test(control.value) ? null : { passport: true };
  };
  nationalIdValidator: ValidatorFn = (control: AbstractControl) => {
    return /^[0-9]{10}$/.test(control.value) ? null : { nationalId: true };
  };

  updateDocumentValidators() {
    if (!this.passengers) return;
    for (let i = 0; i < this.passengers.length; i++) {
      const docControl = this.passengers.at(i).get('documentNumber');
      if (docControl) {
        // Set validators explicitly to avoid duplicates
        const validators = [Validators.required];
        if (this.isInternational) {
          validators.push(this.passportValidator);
        } else {
          validators.push(this.nationalIdValidator);
        }
        docControl.setValidators(validators);
        docControl.updateValueAndValidity();
      }
    }
  }

  submit() {
    if (this.form.valid && this.flight) {
      this.book.emit({
        flight: this.flight,
        passengers: this.form.value.passengers
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
