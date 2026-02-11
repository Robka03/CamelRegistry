using CamelRegistry.Api.Data;
using CamelRegistry.Api.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=camels.db"));

builder.Services.AddCors(opt => {
    opt.AddPolicy("AllowAngular", policy => {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();
app.UseCors("AllowAngular");
// DB auto-create
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/api/camels", async (AppDbContext db) =>
    await db.Camels.ToListAsync());

app.MapGet("/api/camels/{id}", async (int id, AppDbContext db) =>
{
    var camel = await db.Camels.FindAsync(id);
    return camel is null ? Results.NotFound() : Results.Ok(camel);
});

app.MapPost("/api/camels", async (Camel camel, AppDbContext db) =>
{
    if (camel.HumpCount is not (1 or 2))
        return Results.BadRequest("HumpCount must be 1 or 2.");

    db.Camels.Add(camel);
    await db.SaveChangesAsync();

    return Results.Created($"/api/camels/{camel.Id}", camel);
});

app.MapPut("/api/camels/{id}", async (int id, Camel input, AppDbContext db) =>
{
    var camel = await db.Camels.FindAsync(id);
    if (camel is null)
        return Results.NotFound();

    camel.Name = input.Name;
    camel.Color = input.Color;
    camel.HumpCount = input.HumpCount;
    camel.LastFed = input.LastFed;

    await db.SaveChangesAsync();
    return Results.Ok(camel);
});

app.MapDelete("/api/camels/{id}", async (int id, AppDbContext db) =>
{
    var camel = await db.Camels.FindAsync(id);
    if (camel is null)
        return Results.NotFound();

    db.Camels.Remove(camel);
    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.Run();
