namespace F1.Models;

// Classe modelo dos pilotos
public class Piloto
{
    public int id { get; set; }
    public string? nome { get; set; }
    public string? nacionalidade { get; set; }
    
    public int equipeId { get; set; }
    public Equipe? equipe { get; set; }
    
    public DateTime criadoEm { get; set; } = DateTime.Now;
}