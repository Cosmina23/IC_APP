﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Models;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(easyBacDbContext))]
    partial class easyBacDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("backend.Models.BiologyScore", b =>
                {
                    b.Property<int>("ScoreId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ScoreId"));

                    b.Property<int>("Level1Score")
                        .HasColumnType("int");

                    b.Property<int>("Level2Score")
                        .HasColumnType("int");

                    b.Property<int>("Level3Score")
                        .HasColumnType("int");

                    b.Property<int>("Level4Score")
                        .HasColumnType("int");

                    b.Property<int>("Level5Score")
                        .HasColumnType("int");

                    b.Property<int>("TotalScore")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("ScoreId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("BiologyScores");
                });

            modelBuilder.Entity("backend.Models.Challenge", b =>
                {
                    b.Property<int>("ChallengeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ChallengeId"));

                    b.Property<int>("Answer")
                        .HasColumnType("int");

                    b.Property<string>("Course")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Option1")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("Option2")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("Option3")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("Question")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.HasKey("ChallengeId");

                    b.ToTable("Challenges");
                });

            modelBuilder.Entity("backend.Models.HistoryScore", b =>
                {
                    b.Property<int>("ScoreId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ScoreId"));

                    b.Property<int>("Level1Score")
                        .HasColumnType("int");

                    b.Property<int>("Level2Score")
                        .HasColumnType("int");

                    b.Property<int>("Level3Score")
                        .HasColumnType("int");

                    b.Property<int>("Level4Score")
                        .HasColumnType("int");

                    b.Property<int>("Level5Score")
                        .HasColumnType("int");

                    b.Property<int>("TotalScore")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("ScoreId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("HistoryScores");
                });

            modelBuilder.Entity("backend.Models.Question", b =>
                {
                    b.Property<int>("QnId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("QnId"));

                    b.Property<int>("Answer")
                        .HasColumnType("int");

                    b.Property<string>("Course")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("Level")
                        .HasColumnType("int");

                    b.Property<string>("Option1")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("Option2")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("Option3")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("QuestionAsked")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.HasKey("QnId");

                    b.ToTable("Question");
                });

            modelBuilder.Entity("backend.Models.RomanaScore", b =>
                {
                    b.Property<int>("ScoreId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ScoreId"));

                    b.Property<int>("Level1Score")
                        .HasColumnType("int");

                    b.Property<int>("Level2Score")
                        .HasColumnType("int");

                    b.Property<int>("Level3Score")
                        .HasColumnType("int");

                    b.Property<int>("Level4Score")
                        .HasColumnType("int");

                    b.Property<int>("Level5Score")
                        .HasColumnType("int");

                    b.Property<int>("TotalScore")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("ScoreId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("RomanaScores");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AvatarPath")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Nume")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(150)");

                    b.Property<string>("Prenume")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Telefon")
                        .IsRequired()
                        .HasColumnType("nvarchar(12)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("backend.Models.BiologyScore", b =>
                {
                    b.HasOne("backend.Models.User", "User")
                        .WithOne("ScoreBiology")
                        .HasForeignKey("backend.Models.BiologyScore", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.HistoryScore", b =>
                {
                    b.HasOne("backend.Models.User", "User")
                        .WithOne("ScoreHistory")
                        .HasForeignKey("backend.Models.HistoryScore", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.RomanaScore", b =>
                {
                    b.HasOne("backend.Models.User", "User")
                        .WithOne("ScoreRomana")
                        .HasForeignKey("backend.Models.RomanaScore", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Navigation("ScoreBiology")
                        .IsRequired();

                    b.Navigation("ScoreHistory")
                        .IsRequired();

                    b.Navigation("ScoreRomana")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
