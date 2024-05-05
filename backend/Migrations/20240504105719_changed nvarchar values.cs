using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class changednvarcharvalues : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                    Level = table.Column<int>(type: "int", nullable: false)
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
                name: "Question");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
