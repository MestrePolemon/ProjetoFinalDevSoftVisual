using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace F1.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Equipes",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    nome = table.Column<string>(type: "TEXT", nullable: true),
                    paisOrigem = table.Column<string>(type: "TEXT", nullable: true),
                    dataFundacao = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    criadoEm = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Pilotos",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    nome = table.Column<string>(type: "TEXT", nullable: true),
                    nacionalidade = table.Column<string>(type: "TEXT", nullable: true),
                    equipeId = table.Column<int>(type: "INTEGER", nullable: false),
                    criadoEm = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pilotos", x => x.id);
                    table.ForeignKey(
                        name: "FK_Pilotos_Equipes_equipeId",
                        column: x => x.equipeId,
                        principalTable: "Equipes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Pilotos_equipeId",
                table: "Pilotos",
                column: "equipeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Pilotos");

            migrationBuilder.DropTable(
                name: "Equipes");
        }
    }
}
