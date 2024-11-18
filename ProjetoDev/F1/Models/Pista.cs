namespace F1.Models;

public class Pista
{
    public int id { get; set; }
    public string? nome { get; set; }
    public string? pais { get; set; }
    public double distancia { get; set; }
    public DateOnly dataFundacao { get; set; }
    public DateTime criadoEm { get; set; } = DateTime.Now;
}