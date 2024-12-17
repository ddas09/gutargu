using Gutargu.Backend.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Gutargu.Backend.DAL.Configurations;

namespace Gutargu.Backend.DAL;

public class GutarguDBContext : DbContext
{
    public GutarguDBContext(DbContextOptions<GutarguDBContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new UserConfiguration());
    }
}