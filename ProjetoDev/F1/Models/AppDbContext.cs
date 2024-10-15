using Microsoft.EntityFrameworkCore;

namespace F1.Models;

public class AppDbContext : DbContext
{
    DbSet<Piloto> Pilotos { get; set; }
    DbSet<Equipe> Equipes { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=FormulaUm.db");
    }
}