import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingComponent } from './booking.component';
import { FlightService } from '../../services/flight.service';

class MockFlightService {
  getAirportCountryMap() {
    return { AAA: 'X', BBB: 'Y' };
  }
}

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  let mockService: MockFlightService;

  beforeEach(async () => {
    mockService = new MockFlightService();
    await TestBed.configureTestingModule({
      imports: [BookingComponent, ReactiveFormsModule],
      providers: [{ provide: FlightService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create and initialize airportCountryMap', () => {
    expect(component).toBeTruthy();
    expect(component.airportCountryMap['AAA']).toBe('X');
  });

  it('should create passenger controls when passengersCount changes', () => {
    component.passengersCount = 2;
    component.ngOnChanges({ passengersCount: { currentValue: 2, previousValue: 1, firstChange: false, isFirstChange: () => false } as any });
    expect(component.passengers.length).toBe(2);
  });

  it('should apply passport validator for international flights', () => {
    component.flight = { provider: 'P', flightNumber: 'F1', origin: 'AAA', destination: 'BBB', departureTime: '', arrivalTime: '', duration: '', cabinClass: '', pricePerPassenger: 100, totalPrice: 200 };
    component.passengersCount = 1;
    component.setPassengers(1);
    // international because AAA != BBB
    const docControl = component.passengers.at(0).get('documentNumber');
    // invalid passport (too short / wrong chars)
    docControl?.setValue('123');
    component.updateDocumentValidators();
    expect(docControl?.valid).toBeFalsy();
    // valid passport: 12 alphanumeric
    docControl?.setValue('A12345678901');
    component.updateDocumentValidators();
    expect(docControl?.valid).toBeTruthy();
  });

  it('should emit booking request when form valid and submitted', () => {
    vi.spyOn(component.book, 'emit');
    component.flight = { provider: 'P', flightNumber: 'F1', origin: 'AAA', destination: 'BBB', departureTime: '', arrivalTime: '', duration: '', cabinClass: '', pricePerPassenger: 100, totalPrice: 200 };
    component.setPassengers(1);
    const p = component.passengers.at(0);
    p.get('fullName')?.setValue('John Doe');
    p.get('email')?.setValue('john@example.com');
    p.get('documentNumber')?.setValue('A12345678901');
    component.submit();
    expect(component.book.emit).toHaveBeenCalled();
  });
});
