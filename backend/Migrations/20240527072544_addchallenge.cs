using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class addchallenge : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Challenges",
                columns: table => new
                {
                    ChallengeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Course = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Question = table.Column<string>(type: "nvarchar(250)", nullable: false),
                    Option1 = table.Column<string>(type: "nvarchar(250)", nullable: false),
                    Option2 = table.Column<string>(type: "nvarchar(250)", nullable: false),
                    Option3 = table.Column<string>(type: "nvarchar(250)", nullable: false),
                    Answer = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Challenges", x => x.ChallengeId);
                });

            migrationBuilder.CreateTable(
                name: "DailyChallenges",
                columns: table => new
                {
                    ChallengeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Course = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Question = table.Column<string>(type: "nvarchar(250)", nullable: false),
                    Option1 = table.Column<string>(type: "nvarchar(250)", nullable: false),
                    Option2 = table.Column<string>(type: "nvarchar(250)", nullable: false),
                    Option3 = table.Column<string>(type: "nvarchar(250)", nullable: false),
                    Answer = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyChallenges", x => x.ChallengeId);
                });

            migrationBuilder.CreateTable(
                name: "Question",
                columns: table => new
                {
                    QnId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionAsked = table.Column<string>(type: "nvarchar(250)", nullable: false),
                    Option1 = table.Column<string>(type: "nvarchar(250)", nullable: false),
                    Option2 = table.Column<string>(type: "nvarchar(250)", nullable: false),
                    Option3 = table.Column<string>(type: "nvarchar(250)", nullable: false),
                    Answer = table.Column<int>(type: "int", nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    Course = table.Column<string>(type: "nvarchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Question", x => x.QnId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Nume = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Prenume = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Telefon = table.Column<string>(type: "nvarchar(12)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(150)", nullable: false),
                    AvatarPath = table.Column<string>(type: "nvarchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BiologyScores",
                columns: table => new
                {
                    ScoreId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Level1Score = table.Column<int>(type: "int", nullable: false),
                    Level2Score = table.Column<int>(type: "int", nullable: false),
                    Level3Score = table.Column<int>(type: "int", nullable: false),
                    Level4Score = table.Column<int>(type: "int", nullable: false),
                    Level5Score = table.Column<int>(type: "int", nullable: false),
                    TotalScore = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BiologyScores", x => x.ScoreId);
                    table.ForeignKey(
                        name: "FK_BiologyScores_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HistoryScores",
                columns: table => new
                {
                    ScoreId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Level1Score = table.Column<int>(type: "int", nullable: false),
                    Level2Score = table.Column<int>(type: "int", nullable: false),
                    Level3Score = table.Column<int>(type: "int", nullable: false),
                    Level4Score = table.Column<int>(type: "int", nullable: false),
                    Level5Score = table.Column<int>(type: "int", nullable: false),
                    TotalScore = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistoryScores", x => x.ScoreId);
                    table.ForeignKey(
                        name: "FK_HistoryScores_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RomanaScores",
                columns: table => new
                {
                    ScoreId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Level1Score = table.Column<int>(type: "int", nullable: false),
                    Level2Score = table.Column<int>(type: "int", nullable: false),
                    Level3Score = table.Column<int>(type: "int", nullable: false),
                    Level4Score = table.Column<int>(type: "int", nullable: false),
                    Level5Score = table.Column<int>(type: "int", nullable: false),
                    TotalScore = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RomanaScores", x => x.ScoreId);
                    table.ForeignKey(
                        name: "FK_RomanaScores_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BiologyScores_UserId",
                table: "BiologyScores",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_HistoryScores_UserId",
                table: "HistoryScores",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RomanaScores_UserId",
                table: "RomanaScores",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BiologyScores");

            migrationBuilder.DropTable(
                name: "Challenges");

            migrationBuilder.DropTable(
                name: "DailyChallenges");

            migrationBuilder.DropTable(
                name: "HistoryScores");

            migrationBuilder.DropTable(
                name: "Question");

            migrationBuilder.DropTable(
                name: "RomanaScores");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
