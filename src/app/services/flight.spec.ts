import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FlightService } from './flight.service';

describe('FlightService', () => {
  let service: FlightService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(FlightService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call searchFlights endpoint with given request', () => {
    const req = { origin: 'A', destination: 'B', departureDate: '2026-01-01', passengers: 1, cabinClass: 'Economy' };
    service.searchFlights(req as any).subscribe();
    const httpReq = httpMock.expectOne('https://localhost:44382/api/flights/search');
    expect(httpReq.request.method).toBe('POST');
    expect(httpReq.request.body).toEqual(req);
    httpReq.flush([]);
  });

  it('should call bookFlight endpoint with given booking request', () => {
    const booking = { flight: {}, passengers: [] } as any;
    service.bookFlight(booking).subscribe();
    const httpReq = httpMock.expectOne('https://localhost:44382/api/flights/book');
    expect(httpReq.request.method).toBe('POST');
    expect(httpReq.request.body).toEqual(booking);
    httpReq.flush({ bookingReference: 'REF', status: 'Confirmed' });
  });
});
