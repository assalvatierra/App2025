using Microsoft.EntityFrameworkCore;
using Context;
using Entities;
using Microsoft.AspNetCore.Http.HttpResults;
namespace App2025.Server.Controllers;

public static class CustMainEndpoints
{
    public static void MapCustMainEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/CustMain");

        group.MapGet("/", async (Models db) =>
        {
            return await db.CustMains.ToListAsync();
        })
        .WithName("GetAllCustMains");

        group.MapGet("/{id}", async Task<Results<Ok<CustMain>, NotFound>> (int id, Models db) =>
        {
            return await db.CustMains.AsNoTracking()
                .FirstOrDefaultAsync(model => model.Id == id)
                is CustMain model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetCustMainById");

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int id, CustMain custMain, Models db) =>
        {
            var affected = await db.CustMains
                .Where(model => model.Id == id)
                .ExecuteUpdateAsync(setters => setters
                    .SetProperty(m => m.Id, custMain.Id)
                    .SetProperty(m => m.CustStatusId, custMain.CustStatusId)
                    );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateCustMain");

        group.MapPost("/", async (CustMain custMain, Models db) =>
        {
            db.CustMains.Add(custMain);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/CustMain/{custMain.Id}",custMain);
        })
        .WithName("CreateCustMain");

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int id, Models db) =>
        {
            var affected = await db.CustMains
                .Where(model => model.Id == id)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteCustMain");
    }
}
