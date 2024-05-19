using Microsoft.EntityFrameworkCore;
using Context;
using Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.OpenApi;
namespace App2025.Server.Controllers;

public static class CustStatusEndpoints
{
    public static void MapCustStatusEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/CustStatus").WithTags(nameof(CustStatus));

        group.MapGet("/", async (Models db) =>
        {
            //var command = db.Database.GetDbConnection().CreateCommand();
            //command.CommandText = "SELECT * FROM [dbo].[CustStatuses]";
            //db.Database.OpenConnection();
            //var result = command.ExecuteReader();
            //while(result.Read())
            //{
            //    int sId = result.GetInt32( result.GetOrdinal("Id") );
            //    string sCode = result.GetString(result.GetOrdinal("Code"));
            //}

            //foreach (var item in result )
            //{
            //    CustStatus t1 = (CustStatus) item;
            //}

            //List<CustStatus> t = db.CustStatuses.FromSqlRaw( command.CommandText ).ToList();

            return await db.CustStatuses.ToListAsync();
        })
        .WithName("GetAllCustStatuses")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<CustStatus>, NotFound>> (int id, Models db) =>
        {
            return await db.CustStatuses.AsNoTracking()
                .FirstOrDefaultAsync(model => model.Id == id)
                is CustStatus model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetCustStatusById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int id, CustStatus custStatus, Models db) =>
        {
            var affected = await db.CustStatuses
                .Where(model => model.Id == id)
                .ExecuteUpdateAsync(setters => setters
                    .SetProperty(m => m.Id, custStatus.Id)
                    );
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateCustStatus")
        .WithOpenApi();

        group.MapPost("/", async (CustStatus custStatus, Models db) =>
        {
            db.CustStatuses.Add(custStatus);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/CustStatus/{custStatus.Id}",custStatus);
        })
        .WithName("CreateCustStatus")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int id, Models db) =>
        {
            var affected = await db.CustStatuses
                .Where(model => model.Id == id)
                .ExecuteDeleteAsync();
            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteCustStatus")
        .WithOpenApi();
    }
}
