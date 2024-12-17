using System.Reflection;
using Gutargu.Backend.DAL;
using Microsoft.AspNetCore.Mvc;
using Gutargu.Backend.Common.Models;
using Microsoft.EntityFrameworkCore;
using Gutargu.Backend.DAL.Extensions;
using Gutargu.Backend.API.Extensions;
using Gutargu.Backend.Services.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Add services to the container.
builder.Services.AddControllers();

// This is to configure custom ModelState validation filter
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "SecurePass API", Version = "v1" });

    // To include XML comments in Swagger UI
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});

// For generating lowecase routes
builder.Services.AddRouting(options => options.LowercaseUrls = true);

// Adding DB context
builder.Services.AddDbContext<GutarguDBContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("GutarguDB"));
});

builder.Services.Configure<ImageServiceConfiguration>
    (
        builder.Configuration.GetSection(nameof(ImageServiceConfiguration))
    );

// For registering action filters
builder.Services.RegisterActionFilters();

// For registering repositories for DI
builder.Services.RegisterRepositories();

// For registering services for DI
builder.Services.RegisterServices();

// For AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// For configuring CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapOpenApi();
}

// For configuring custom middlewares
app.ConfigureMiddlewares();

app.UseHttpsRedirection();

app.MapControllers();

// Enable CORS
app.UseCors();

app.Run();