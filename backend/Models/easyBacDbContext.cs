using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Models
{
    public class easyBacDbContext : DbContext
    {
        public easyBacDbContext(DbContextOptions<easyBacDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } //a table Users of type User

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => { entity.HasIndex(e => e.Email).IsUnique(); }); //email should be unique
        }
        public DbSet<backend.Models.Question> Question { get; set; } = default!;
    }
}