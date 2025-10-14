using eJobs.Data;
using eJobs.Model;
using eJobsAPI.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<JobDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("JobsDbContext") ?? throw new InvalidOperationException("Connection string 'ErpDbContext' not found.")));


// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("Default", builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();

    });
});

builder.Services.AddControllers();

builder.Services.AddScoped<ITripLogServices,TripLogServices>();
builder.Services.AddScoped<IJobsServices, JobsServices>();
builder.Services.AddScoped<IReceivablesServices, ReceivablesServices>();
builder.Services.AddScoped<IExpensesServices, ExpensesServices>();
builder.Services.AddScoped<IMaintenanceServices, MaintenanceServices>();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    //app.UseSwagger();
    //app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.MapStaticAssets();

app.UseCors("Default");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
