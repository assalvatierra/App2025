# AI Coding Agent Instructions for AngularApp1

## Architecture Overview

**Full-stack ERP System**: ASP.NET Core 9.0 backend + Angular 19 SPA frontend with AI agent integration via Semantic Kernel and RabbitMQ messaging.

### Backend (.NET Server)
- **Framework**: ASP.NET Core 9.0, Entity Framework Core
- **Key Patterns**: 
  - API Controllers follow standard REST conventions at `api/[controller]`
  - Dual DbContext pattern: `ErpDbContext` (business data) + `ErpIdentityContext` (auth)
  - External domain models via `Erp.Domain` project reference (../../Erp.Domain/)
  - Semantic Kernel AI agents with Azure OpenAI (`AgentBasic.cs`) and plugin architecture
  - RabbitMQ integration with environment-based configuration (NoOp/Local/CloudAMQP)

### Frontend (Angular Client)
- **Framework**: Angular 19 with Angular Material
- **Architecture**: 
  - Feature modules by domain (`pages/`) with dedicated routing
  - Shared module (`shared/`) for reusable components (EntityListTableComponent, ListDialogComponent)
  - Centralized API service (`core/api.service.ts`) - **ALL HTTP calls go through this**
  - Hardcoded baseUrl: `http://localhost:5157` in ApiService
  - AuthGuard with JWT token authentication
  - Form components follow pattern: list view + form view (add/edit) with route params

## Critical Development Workflows

### Running the Application
```powershell
# Backend (from AngularApp1.Server/)
dotnet run  # Starts at https://localhost:7252 or http://localhost:5157

# Frontend (from angularapp1.client/)
npm start   # Uses run-script-os for Windows/Unix SSL cert handling
            # Proxies to backend via proxy.conf.js at https://localhost:51099
```

### Database Connections
- Two connection strings required in `appsettings.json`:
  - `ErpDbContext` - main business database
  - `ErpIdentityConnection` - ASP.NET Identity
- DbContext lives in `AngularApp1.Server/Data/ErpDbContext.cs`
- Domain models reference external `Erp.Domain.Models` namespace

### AI Agent System
- **Semantic Kernel Integration**: `Services/AgentBasic.cs` uses Azure OpenAI (gpt-4.1)
- **Plugins**: Located in `Services/Plugins/` (eJobPlugin, AgentBinPlugin, AgentTaskPlugin, etc.)
- **Chat Endpoint**: `api/AgentChat/{id}?message=...` processes agent conversations
- **Agent Configuration**: Agents stored in database (`Agent` table) with instructions in `AgentInstruction`

### RabbitMQ Service Pattern
- **Extension Method**: `builder.AddRabbitMqService()` in Program.cs
- **Version-based DI**: appsettings.json `RabbitMq.Version` controls implementation
  - Empty/null → `NoOpRabbitMq` (no-op)
  - "LOCAL" or "CLOUDAMQP" → `Cloudamqp` implementation
- **Interface**: `IRabbitMqBasic` with single `Send(RabbitMqMessageDto)` method

## Project-Specific Conventions

### API Service Pattern (Angular)
When adding new API endpoints:
1. Add methods to `core/api.service.ts` following existing patterns
2. Use RxJS `map` operator for response transformation
3. Example pattern:
```typescript
getEntities(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/api/Entities`).pipe(
    map((res: any) => res.map((item: any) => ({ id: item.id, name: item.name })))
  );
}
```

### Form Component Structure
Standard CRUD pages follow this structure:
- `pages/{feature}/{feature}.component.ts` - list view with table
- `pages/{feature}/{feature}-form/{feature}-form.component.ts` - add/edit form
- Form initialization uses `FormBuilder` with `fb.group()`
- Route param `:id` - 0 = new record, >0 = edit existing
- Forms use `updateCurrentDataValues()` → `updateApiData()` pattern

### DbContext Configuration
When adding entities to `ErpDbContext`:
```csharp
public DbSet<Erp.Domain.Models.YourEntity> YourEntity { get; set; } = default!;
```
- Override `OnModelCreating` for relationship configuration
- Table name mapping: `modelBuilder.Entity<T>().ToTable("TableName")`

### Authentication
- JWT Bearer tokens with hardcoded validation (Issuer: "ABC", Audience: "ALL")
- Secret key in Program.cs: "123456-123456-123456-123456-123456" ⚠️ (dev only)
- Routes protected via `[Authorize]` attribute and Angular `AuthGuard`
- Swagger UI configured with JWT security scheme

### Material Design Components
Import pattern in Angular modules:
```typescript
// Standard imports for tables
MatTableModule, MatPaginatorModule, MatSortModule
// Standard imports for forms  
MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule
```

## External Dependencies
- **eJobsAPI** project (../../eJobsAPI/) - referenced but location may vary
- **Erp.Domain** project (../../Erp.Domain/) - contains all domain models
- Check for `ProjectReference` in .csproj if build fails

## Testing
- Angular: Jasmine + Karma (`ng test`)
- Playwright E2E tests configured (`tests/` directory)
- Backend: No test project present in workspace

## Important Notes
- Angular uses **standalone: false** for most components (module-based)
- API URLs are **hardcoded** in api.service.ts - update for different environments
- RabbitMQ configuration read from `appsettings.json` "RabbitMq" section
- Semantic Kernel agents use **Azure OpenAI endpoint** (endpoint/key in AgentBasic.cs)
- Dual SPA setup: Angular dev server proxies API calls via `aspnetcore-https.js` script
