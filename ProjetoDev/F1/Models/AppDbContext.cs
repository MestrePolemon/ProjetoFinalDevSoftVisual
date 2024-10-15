using Microsoft.EntityFrameworkCore;

namespace F1.Models;

public class AppDbContext : DbContext
{
    // Tabelas que seram usadas no banco de dados
    public DbSet<Piloto> Pilotos { get; set; }
    public DbSet<Equipe> Equipes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=FormulaUm.db");
    }
}