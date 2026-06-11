# AI prompts log

## Initial refactor request
**Prompt:** refactor all code changes to highest level and also add test files for all components necessary
**AI output:** Clarifying question list; proceeded after user confirmed test framework (Karma/Jasmine).
**Decision:** Modified - changed to Vitest-compatible tests during implementation because project uses Vitest.
**Reason:** Type mismatches and toolchain in repo indicated Vitest rather than Jasmine.

## Move static data to service
**Prompt:** move airports, cabinClasses, passengerOptions to FlightService and update components
**AI output:** Implemented getters and updated components to inject FlightService
**Decision:** Accepted

## Add comprehensive tests
**Prompt:** create unit tests for components and FlightService
**AI output:** Added/updated spec files for FlightSearch, FlightResults, Booking, FlightService
**Decision:** Accepted (modified to use Vitest matchers and vi spies)

## Fix failing tests
**Prompt:** Resolve test failures and matcher incompatibilities
**AI output:** Replaced Jasmine matchers with Vitest-compatible ones, updated imports and component names
**Decision:** Accepted


### Instructions file passed to AI tool
- Use Angular standalone components, centralize shared logic into services, add Vitest unit tests for components and services, ensure tests cover form validation and API calls.
