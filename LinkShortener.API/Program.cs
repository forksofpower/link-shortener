using LinkShortener.API;
using Microsoft.EntityFrameworkCore;
using NanoidDotNet;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

// Use in-memory db for now
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("UrlsDb"));

// Create CORS Policies
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy.WithOrigins("http://localhost:4200")
                                     .AllowAnyMethod()
                                     .AllowAnyHeader());
});

var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseCors("AllowAngular");

// Endpoints

// Create and store mapping between url and short code
app.MapPost("/api/shorten", async (AppDbContext db, string longUrl) =>
{
    // Validate input
    if (!Uri.TryCreate(longUrl, UriKind.Absolute, out _))
        return Results.BadRequest("Invalid URL format");
    
    // Generate Unique ID
    var code = await Nanoid.GenerateAsync(size: 7);
    
    var mapping = new UrlMapping { ShortCode = code, LongUrl = longUrl };
    
    
    db.UrlMappings.Add(mapping);
    await db.SaveChangesAsync();
    
    return Results.Ok( new { ShortCode = code , LongUrl = longUrl });
});

// Redirect to url based on short code
app.MapGet("/{code}", async (AppDbContext db, string code) =>
{
    var mapping = await db.UrlMappings.FirstOrDefaultAsync(m => m.ShortCode == code);

    return mapping is null
        ? Results.NotFound()
        : Results.Redirect(mapping.LongUrl);
});

app.Run();

// Only for tests
public partial class Program
{
}