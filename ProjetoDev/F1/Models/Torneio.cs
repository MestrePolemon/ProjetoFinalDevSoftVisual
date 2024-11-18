namespace F1.Models;

public class Torneio
{
    public int id { get; set; }
    public string? ano { get; set; }
    public int numCorridas { get; set; }
    public int vencedorID { get; set; }
    public Piloto? vencedor { get; set; }
    public int EquipeVencedoraID { get; set; }
    public Equipe? EquipeVencedora { get; set; }
    public DateTime criadoEm { get; set; } = DateTime.Now;
}