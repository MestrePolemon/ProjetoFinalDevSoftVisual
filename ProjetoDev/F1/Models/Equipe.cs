namespace F1.Models;

// Classe modelo das equipes
public class Equipe
{
    public int id { get; set; }
    public string? nome { get; set; }
    public string? paisOrigem { get; set; }
    public DateOnly dataFundacao { get; set; }
    public List<Piloto> pilotos { get; set; } = new List<Piloto>();
    public DateTime criadoEm { get; set; } = DateTime.Now;
}