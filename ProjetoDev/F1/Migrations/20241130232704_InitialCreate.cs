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
                name: "Pistas",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    nome = table.Column<string>(type: "TEXT", nullable: true),
                    pais = table.Column<string>(type: "TEXT", nullable: true),
                    distancia = table.Column<double>(type: "REAL", nullable: false),
                    dataFundacao = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    criadoEm = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pistas", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Pilotos",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    nome = table.Column<string>(type: "TEXT", nullable: true),
                    nacionalidade = table.Column<string>(type: "TEXT", nullable: true),
                    criadoEm = table.Column<DateTime>(type: "TEXT", nullable: false),
                    equipeId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pilotos", x => x.id);
                    table.ForeignKey(
                        name: "FK_Pilotos_Equipes_equipeId",
                        column: x => x.equipeId,
                        principalTable: "Equipes",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Corridas",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    nomeEvento = table.Column<string>(type: "TEXT", nullable: true),
                    voltas = table.Column<int>(type: "INTEGER", nullable: false),
                    dataEvento = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    pistaId = table.Column<int>(type: "INTEGER", nullable: true),
                    vencedorID = table.Column<int>(type: "INTEGER", nullable: true),
                    segundoID = table.Column<int>(type: "INTEGER", nullable: true),
                    terceiroID = table.Column<int>(type: "INTEGER", nullable: true),
                    criadoEm = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Corridas", x => x.id);
                    table.ForeignKey(
                        name: "FK_Corridas_Pilotos_segundoID",
                        column: x => x.segundoID,
                        principalTable: "Pilotos",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Corridas_Pilotos_terceiroID",
                        column: x => x.terceiroID,
                        principalTable: "Pilotos",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Corridas_Pilotos_vencedorID",
                        column: x => x.vencedorID,
                        principalTable: "Pilotos",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Corridas_Pistas_pistaId",
                        column: x => x.pistaId,
                        principalTable: "Pistas",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Torneios",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ano = table.Column<string>(type: "TEXT", nullable: true),
                    numCorridas = table.Column<int>(type: "INTEGER", nullable: false),
                    vencedorID = table.Column<int>(type: "INTEGER", nullable: false),
                    EquipeVencedoraID = table.Column<int>(type: "INTEGER", nullable: false),
                    criadoEm = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Torneios", x => x.id);
                    table.ForeignKey(
                        name: "FK_Torneios_Equipes_EquipeVencedoraID",
                        column: x => x.EquipeVencedoraID,
                        principalTable: "Equipes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Torneios_Pilotos_vencedorID",
                        column: x => x.vencedorID,
                        principalTable: "Pilotos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Corridas_pistaId",
                table: "Corridas",
                column: "pistaId");

            migrationBuilder.CreateIndex(
                name: "IX_Corridas_segundoID",
                table: "Corridas",
                column: "segundoID");

            migrationBuilder.CreateIndex(
                name: "IX_Corridas_terceiroID",
                table: "Corridas",
                column: "terceiroID");

            migrationBuilder.CreateIndex(
                name: "IX_Corridas_vencedorID",
                table: "Corridas",
                column: "vencedorID");

            migrationBuilder.CreateIndex(
                name: "IX_Pilotos_equipeId",
                table: "Pilotos",
                column: "equipeId");

            migrationBuilder.CreateIndex(
                name: "IX_Torneios_EquipeVencedoraID",
                table: "Torneios",
                column: "EquipeVencedoraID");

            migrationBuilder.CreateIndex(
                name: "IX_Torneios_vencedorID",
                table: "Torneios",
                column: "vencedorID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Corridas");

            migrationBuilder.DropTable(
                name: "Torneios");

            migrationBuilder.DropTable(
                name: "Pistas");

            migrationBuilder.DropTable(
                name: "Pilotos");

            migrationBuilder.DropTable(
                name: "Equipes");
        }
    }
}
