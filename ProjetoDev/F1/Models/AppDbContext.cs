using Microsoft.EntityFrameworkCore;

namespace F1.Models;

public class AppDbContext : DbContext
{
    // Tabelas que seram usadas no banco de dados
    public DbSet<Piloto> Pilotos { get; set; }
    public DbSet<Equipe> Equipes { get; set; }
    public DbSet<Pista> Pistas { get; set; }
    public DbSet<Corrida> Corridas { get; set; }
    public DbSet<Torneio> Torneios { get; set; }
    

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=FormulaUm.db");
    }
}