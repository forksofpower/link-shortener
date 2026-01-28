using Microsoft.EntityFrameworkCore;

namespace LinkShortener.API;

public class AppDbContext(DbContextOptions<AppDbContext> options): DbContext(options)
{
    public DbSet<UrlMapping> UrlMappings => Set<UrlMapping>();
}