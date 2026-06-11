# Spec

- Implementation plan
  - Use Angular standalone components: FlightSearch, FlightResults, Booking
  - Centralize shared data and API calls in FlightService
  - Provide TypeScript interfaces for request/response payloads
  - Add comprehensive Vitest unit tests for components and service

- Key assumptions
  - Backend API located at https://localhost:44382
  - Flights search endpoint: POST /api/flights/search
  - Booking endpoint: POST /api/flights/book
  - Basic validation: passengers 1-9, passport and national ID formats

- Mapping to requirements
  - Search form fields mapped to FlightSearchRequest
  - Results displayed and sortable in FlightResultsComponent
  - Booking form emits BookingRequest with passenger info

- Files changed
  - src/app/services/flight.service.ts - added shared getters and API calls
  - src/app/components/* - refactor to consume flight service
  - tests added/updated under src/app/components and src/app/services
