using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Models
{
    public class easyBacDbContext : DbContext
    {
        public easyBacDbContext(DbContextOptions<easyBacDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } // a table Users of type User
        public DbSet<Question> Question { get; set; } = default!;
        public DbSet<BiologyScore> BiologyScores { get; set; } = default!;
        public DbSet<RomanaScore> RomanaScores { get; set; } = default!;
        public DbSet<HistoryScore> HistoryScores { get; set; } = default!;
        public DbSet<Comment> Comments { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email).IsUnique(); // email should be unique
            });

            modelBuilder.Entity<BiologyScore>(entity =>
            {
                entity.HasKey(b => b.ScoreId);
                entity.HasOne(b => b.User)
                      .WithOne(u => u.ScoreBiology)
                      .HasForeignKey<BiologyScore>(b => b.UserId)
                      .IsRequired();
            });

            modelBuilder.Entity<RomanaScore>(entity =>
            {
                entity.HasKey(b => b.ScoreId);
                entity.HasOne(b => b.User)
                      .WithOne(u => u.ScoreRomana)
                      .HasForeignKey<RomanaScore>(b => b.UserId)
                      .IsRequired();
            });

            modelBuilder.Entity<HistoryScore>(entity =>
            {
                entity.HasKey(b => b.ScoreId);
                entity.HasOne(b => b.User)
                      .WithOne(u => u.ScoreHistory)
                      .HasForeignKey<HistoryScore>(b => b.UserId)
                      .IsRequired();
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasKey(c => c.CommentID);
                entity.HasOne(c => c.ParentComment)
                      .WithMany(c => c.Replies)
                      .HasForeignKey(c => c.ParentCommentID);
            });
        }
    }

}