using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Erp.Application.Data;
using Scalar.AspNetCore;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ErpApplicationContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ErpApplicationContext") ?? throw new InvalidOperationException("Connection string 'ErpApplicationContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
//builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    //app.UseSwagger();
    //app.UseSwaggerUI();

    //scalar sample url: https://localhost:44327/scalar/v1 
    app.MapScalarApiReference(); 
    
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
