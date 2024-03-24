using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Helpers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<easyBacDbContext>(options =>
options.UseSqlServer(
    builder.Configuration.GetConnectionString("DevConnection")));

builder.Services.AddScoped<JwtService>();
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(options => options
.WithOrigins(new[] { "http://localhost::3000" }) //for react
.AllowAnyHeader()
.AllowAnyMethod()
.AllowCredentials()); //!!!

app.UseAuthorization();

app.MapControllers();

app.Run();
