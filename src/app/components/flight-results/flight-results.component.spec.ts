import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightResultsComponent } from './flight-results.component';
import { FlightSearchResult } from '../../models/flight-search-result';
import { By } from '@angular/platform-browser';

describe('FlightResultsComponent', () => {
  let component: FlightResultsComponent;
  let fixture: ComponentFixture<FlightResultsComponent>;

  const sample: FlightSearchResult[] = [
    { provider: 'A', flightNumber: '1', origin: 'X', destination: 'Y', departureTime: '2026-01-01T09:00:00Z', arrivalTime: '2026-01-01T11:00:00Z', duration: '2h', cabinClass: 'Economy', pricePerPassenger: 100, totalPrice: 200 },
    { provider: 'B', flightNumber: '2', origin: 'X', destination: 'Y', departureTime: '2026-01-01T08:00:00Z', arrivalTime: '2026-01-01T10:00:00Z', duration: '2h', cabinClass: 'Economy', pricePerPassenger: 80, totalPrice: 160 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightResultsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightResultsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should render empty state when no results after search', () => {
    component.loading = false;
    component.hasSearched = true;
    component.results = [];
    fixture.detectChanges();
    const empty = fixture.debugElement.query(By.css('.empty-state'));
    expect(empty).toBeTruthy();
  });

  it('should display results and allow sorting by price', () => {
    component.loading = false;
    component.hasSearched = true;
    component.results = sample;
    fixture.detectChanges();
    expect(component.sortedResults[0].pricePerPassenger).toBe(80);
    component.setSort('pricePerPassenger');
    // toggles direction if same field
    component.setSort('pricePerPassenger');
    fixture.detectChanges();
    expect(component.sortDirection).toBe('desc');
  });

  it('should emit selectFlight when select button clicked', () => {
    spyOn(component.selectFlight, 'emit');
    component.loading = false;
    component.hasSearched = true;
    component.results = sample;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('.select-btn'));
    expect(btn).toBeTruthy();
    btn.nativeElement.click();
    expect(component.selectFlight.emit).toHaveBeenCalled();
  });
});
