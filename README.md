# SkyRoute Travel Platform — Flight Search & Booking

Senior Full-Stack Developer Challenge — SkyRoute Travel Platform (Confidential)

1) Introduction
- Small Flight Search & Booking module (Angular frontend + backend API mocks).
- Spec-driven: spec.md committed before implementation; tests map to requirements.

2) AI tooling
- Tools: GitHub Copilot + assistant (internal) used during development.
- Model: repository-integrated assistant; used for refactors, test scaffolding, prompts recorded in prompts.md.

3) Architecture (key layers)
- UI (Angular standalone components: FlightSearch, FlightResults, Booking)
- Service layer (FlightService: API client + shared lookups)
- API layer (ASP.NET Core backend or mocks: search, booking, provider adapters)
- Provider adapters (GlobalAir, BudgetWings mocks)

Architecture diagram (ASCII)

  Browser
    └─ Angular SPA
        ├─ Components (FlightSearch / FlightResults / Booking)
        └─ Services (FlightService)
            └─ HTTP → Backend API
                 ├─ /api/flights/search  (aggregates provider adapters)
                 └─ /api/flights/book
                     ├─ GlobalAir adapter (fuel surcharge)
                     └─ BudgetWings adapter (promo discount)

4) Project structure
- src/
  - app/
    - components/ (flight-search, flight-results, booking)
    - services/ (flight.service.ts)
    - models/ (interfaces)
    - app.component.ts, main.ts, main.server.ts
  - spec.md, prompts.md
  - package.json, angular.json

5) Tech stack
- Language: TypeScript ~6.x
- Framework: Angular ^22.0.0
- Testing: Vitest ^4.0.8 (used via ng test integration)
- Backend (expected): .NET (recommend .NET 8 SDK for API mocks)

6) API reference
- Swagger UI (backend expected): https://localhost:44382/swagger

7) How to run locally (prereqs + commands)
- Prereqs: Node.js (>=18), npm, Angular CLI (optional), .NET SDK (if running backend)
- Install deps: npm ci
- Run frontend (dev): npm start    # runs `ng serve`
- Build frontend: npm run build
- Run unit tests: npm test         # `ng test` (Vitest)
- Backend (if available): dotnet build && dotnet run (in backend project)
- Backend tests: dotnet test (in backend project)

Notes
- API base URL is configured in src/app/services/flight.service.ts (change to environment config for production).
- See spec.md for the implementation spec and prompts.md for AI interaction log.
