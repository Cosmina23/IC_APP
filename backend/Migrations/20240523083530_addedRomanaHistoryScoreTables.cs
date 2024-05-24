using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class addedRomanaHistoryScoreTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "IX_HistoryScores_UserId",
                table: "HistoryScores",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RomanaScores_UserId",
                table: "RomanaScores",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HistoryScores");

            migrationBuilder.DropTable(
                name: "RomanaScores");
        }
    }
}
