namespace F1.Models;

public class Corrida
{
    public int id { get; set; }
    public string? nomeEvento { get; set; }
    public int voltas { get; set; }
    public DateOnly dataEvento { get; set; }
    public int? pistaId { get; set; }
    public Pista? pista { get; set; }
    public int vencedorID { get; set; }
    public Piloto? vencedor { get; set; }
    public int segundoID { get; set; }
    public Piloto? segundo { get; set; }
    public int terceiroID { get; set; }
    public Piloto? terceiro { get; set; }
    public DateTime criadoEm { get; set; } = DateTime.Now;
}