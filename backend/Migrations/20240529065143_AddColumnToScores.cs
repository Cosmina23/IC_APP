using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddColumnToScores : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LatestChallengeScore",
                table: "RomanaScores",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LatestChallengeScore",
                table: "HistoryScores",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LatestChallengeScore",
                table: "BiologyScores",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LatestChallengeScore",
                table: "RomanaScores");

            migrationBuilder.DropColumn(
                name: "LatestChallengeScore",
                table: "HistoryScores");

            migrationBuilder.DropColumn(
                name: "LatestChallengeScore",
                table: "BiologyScores");
        }
    }
}
