using App2025.Server.Controllers;
using App2025.Server.Identity;
using Context;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

using DevExpress.AspNetCore;
using DevExpress.AspNetCore.Reporting;
//using DevExpress.XtraCharts;
using DevExpress.XtraReports.Web.Extensions;
//using DevExpress.Security.Resources;
using DXReporting.Services;
using DevExpress.XtraCharts;
using DXReporting.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options => 
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.")));
//options.UseInMemoryDatabase("AppDb"));


builder.Services.AddDbContext<Models>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.")));


builder.Services.AddControllers();

builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Dev Express
builder.Services.AddDbContext<ReportDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.")));
//options.UseSqlite(Configuration.GetConnectionString("ReportsDataConnectionString")));

builder.Services.AddDevExpressControls();
builder.Services.AddScoped<ReportStorageWebExtension, CustomReportStorageWebExtension>();
builder.Services.AddMvc();

builder.Services.ConfigureReportingServices(configurator =>
{
    if (builder.Environment.IsDevelopment())
    {
        configurator.UseDevelopmentMode();
    }
    configurator.ConfigureReportDesigner(designerConfigurator =>
    {
    });
    configurator.ConfigureWebDocumentViewer(viewerConfigurator =>
    {
        // Use cache for document generation and export.
        // This setting is necessary in asynchronous mode and when a report has interactive or drill down features.
        viewerConfigurator.UseCachedReportSourceBuilder();
    });
});

builder.Services.AddCors(options => {
    options.AddPolicy("AllowCorsPolicy", builder => {
        // Allow all ports on local host.
        builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost");
        builder.AllowAnyHeader();
        builder.AllowAnyMethod();
    });
});

builder.Services.ConfigureReportingServices(configurator => {
    configurator.UseDevelopmentMode();
    // You can disable version validation manually:
    // configurator.UseDevelopmentMode(x => x.CheckClientLibraryVersions = false);
    // ...
});
var app = builder.Build();

app.UseCors("AllowCorsPolicy");

app.UseDefaultFiles();
app.UseStaticFiles();
app.MapIdentityApi<IdentityUser>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDevExpressControls();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.MapCustStatusEndpoints();

//DevExpress
app.UseRouting();
app.UseDevExpressControls();

//System.Net.ServicePointManager.SecurityProtocol |= System.Net.SecurityProtocolType.Tls12;
//app.UseEndpoints(endpoints =>
//{
//    endpoints.MapControllerRoute(
//        name: "default",
//        pattern: "{controller}/{action=Index}/{id?}");
//});

//app.UseEndpoints(endpoints =>
//{
//    endpoints.MapControllerRoute(
//        name: "default",
//        pattern: "{controller=Home}/{action=Index}/{id?}");
//});
//End DevExpress



app.Run();
