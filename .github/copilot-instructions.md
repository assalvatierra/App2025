# Copilot Instructions

## Project Guidelines
- Server-side code architecture: 3-layer pattern with Controller → Service → DbLayer
- Controller (AngularApp1.Server/Controllers/*.cs): API entry point using dependency injection of IService
  - Handles HTTP requests/responses, error handling, messaging (RabbitMQ integration)
  - Calls service methods for business logic
  - Returns DTOs and domain models to client

- Service (AngularApp1.Server/DBServices/*.cs): Business logic and orchestration layer
  - Interfaces: IJobMainsService (defines contracts)
  - Implementation: JobMainsService injects IJobMainsDbLayer
  - Orchestrates data retrieval from multiple DB layers (e.g., GetListAsync combines JobMain + Status + ItemStatus + ChecklistTransaction)
  - Performs data transformation and composition (e.g., DTO mapping, progress calculations)

- DbLayer (AngularApp1.Server/DBLayer/*.cs): Data access and database operations
  - Interfaces: IJobMainsDbLayer (defines DB contracts)
  - Implementation: JobMainsDbLayer injects ErpDbContext (Entity Framework)
  - Contains entity queries with eager loading (Include/ThenInclude)
  - Handles CRUD operations and SaveChangesAsync calls
  - Provides specialized queries for complex data retrieval (GetJobsWithDetailsAsync, GetJobStatusesByJobIdsAsync, etc.)

Dependency injection pattern: Each layer depends on interfaces of lower layer
- Controller depends on IJobMainsService (injected via constructor)
- Service depends on IJobMainsDbLayer (injected via constructor)  
- DbLayer depends on ErpDbContext

DTOs used for API responses: JobMainListDto (Data Transfer Object for list views with composed data)

All async/await pattern throughout the stack