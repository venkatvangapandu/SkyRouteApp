import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FlightSearchComponent } from './flight-search.component';
import { FlightService } from '../../services/flight.service';
import { By } from '@angular/platform-browser';

class MockFlightService {
  getAirports() {
    return [
      { code: 'AAA', name: 'A Airport', country: 'X' },
      { code: 'BBB', name: 'B Airport', country: 'Y' }
    ];
  }
  getCabinClasses() { return ['Economy', 'Business']; }
  getPassengerOptions() { return [1,2,3]; }
}

describe('FlightSearchComponent', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;
  let mockService: MockFlightService;

  beforeEach(async () => {
    mockService = new MockFlightService();

    await TestBed.configureTestingModule({
      imports: [FlightSearchComponent, ReactiveFormsModule],
      providers: [{ provide: FlightService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create and initialize lists from service', () => {
    expect(component).toBeTruthy();
    expect(component.airports.length).toBe(2);
    expect(component.cabinClasses).toContain('Economy');
    expect(component.passengerOptions).toEqual([1,2,3]);
  });

  it('form should be invalid initially and show validation', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.markAllAsTouched();
    fixture.detectChanges();
    const originError = fixture.debugElement.query(By.css('#origin + .error'));
    // error element exists for touched invalid controls
    expect(component.form.get('origin')?.invalid).toBeTruthy();
  });

  it('should emit search event when form is valid and submitted', () => {
    vi.spyOn(component.search, 'emit');
    component.form.setValue({
      origin: 'AAA',
      destination: 'BBB',
      departureDate: '2026-12-01',
      passengers: 2,
      cabinClass: 'Economy'
    });
    expect(component.form.valid).toBeTruthy();
    component.submit();
    expect(component.search.emit).toHaveBeenCalledWith(expect.objectContaining({ origin: 'AAA', destination: 'BBB' }));
  });

  it('should enforce passenger min/max validation', () => {
    component.form.get('passengers')?.setValue(0);
    expect(component.form.get('passengers')?.valid).toBeFalsy();
    component.form.get('passengers')?.setValue(10);
    expect(component.form.get('passengers')?.valid).toBeFalsy();
    component.form.get('passengers')?.setValue(3);
    expect(component.form.get('passengers')?.valid).toBeTruthy();
  });
});
