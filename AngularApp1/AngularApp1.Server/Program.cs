using AngularApp1.Server.Areas.Identity.Data;
using AngularApp1.Server.Data;
using AngularApp1.Server.DBLayer;
using AngularApp1.Server.Services.PaymentGateway;
//using AngularApp1.Server.Services.Plugins;
//using Microsoft.SemanticKernel;
using AngularApp1.Server.Services.RabbitMQ;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Web;
//using System.IdentityModel.Tokens.Jwt;
//using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Stripe;
//using Microsoft.AspNetCore.Authentication.BearerToken;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add Microsoft Entra ID JWT validation services
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

//// Add Identity and Authentication services to the container.
//builder.Services.AddDbContext<ErpIdentityContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("ErpIdentityConnection") ?? throw new InvalidOperationException("Connection string 'ErpDbContext' not found.")));
//builder.Services.AddDefaultIdentity<ErpIdentityUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<ErpIdentityContext>();

//builder.Services.AddAuthentication(
//    options =>
//{
//    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//}
//).AddJwtBearer(options =>
//{
//    options.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidateIssuer = true,
//        ValidateAudience = true,
//        ValidateLifetime = true,
//        ValidateIssuerSigningKey = true,
//        ValidIssuer = "ABC",
//        ValidAudience = "ALL",
//        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("123456-123456-123456-123456-123456"))
//    };
//});

builder.Services.AddHttpClient();


//builder.Services.AddHttpClient("AgentHttpClient", client =>
//{
//    client.Timeout = TimeSpan.FromMinutes(5); // Set your desired timeout
//    client.BaseAddress = new Uri(builder.Configuration.GetValue<string>("AgentApi"));
//});


builder.Services.AddDbContext<ErpDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ErpDbContext") ?? throw new InvalidOperationException("Connection string 'ErpDbContext' not found.")));


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

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();


//builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(options =>
{
    // add JWT Authentication
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "JWT Authentication",
        Description = "Enter JWT Bearer token **_only_**",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer", // must be lower case
        BearerFormat = "JWT",
        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };
    options.AddSecurityDefinition(securityScheme.Reference.Id, securityScheme);
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {securityScheme, new string[] { }}
                });
});



// ADD Application Services
builder.AddRabbitMqService();
builder.Services.AddSingleton(new StripeClient("secret"));

builder.Services.AddScoped<AngularApp1.Server.DBLayer.IJobMainsDbLayer, AngularApp1.Server.DBLayer.JobMainsDbLayer>();
builder.Services.AddScoped<AngularApp1.Server.DBServices.IJobMainsService, AngularApp1.Server.DBServices.JobMainsService>();
builder.Services.AddScoped<AngularApp1.Server.DBLayer.IJobServicesDbLayer, AngularApp1.Server.DBLayer.JobServicesDbLayer>();
builder.Services.AddScoped<AngularApp1.Server.DBServices.IJobServicesService, AngularApp1.Server.DBServices.JobServicesService>();
builder.Services.AddScoped<IPaymentExternalDbLayer, PaymentExternalDbLayer>();
//builder.Services.AddScoped<IPaymentExternalService, PaymentExternalService>();
builder.Services.AddScoped<IPaymentExternalService, PaymentExternalServiceStripe>();
//builder.Services.AddScoped<IPaymentExternalService, PaymentExternalServicePaymongo>();
builder.Services.AddScoped<AngularApp1.Server.Services.IEmailService, AngularApp1.Server.Services.EmailService>();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
