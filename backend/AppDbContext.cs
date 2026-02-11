using Microsoft.EntityFrameworkCore;
using CamelRegistry.Api.Models; 

namespace CamelRegistry.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    
    public DbSet<Camel> Camels => Set<Camel>();
}