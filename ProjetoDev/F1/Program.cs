// Código feito por: Bruno Trevizan Rizzatto, Luiz Fernando de Castro Simm e Yuji Chikara Kiyota
using F1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});
var app = builder.Build();

// Página Inicial
app.MapGet("/", () => "Bem vindo ao F1!");

// Cadastro de equipes e pilotos
app.MapPost("/F1/equipes/cadastrar", ([FromBody] Equipe equipe,
    [FromServices] AppDbContext ctx) =>
{
    if (ctx.Equipes.Count() < 2)
    {
        ctx.Equipes.Add(equipe);
        ctx.SaveChanges();
        return Results.Created("", equipe);
    }
    return Results.BadRequest("O limite de equipes foi atingido!");
});

app.MapPost("/F1/pilotos/cadastrar", ([FromBody] Piloto piloto, 
    [FromServices] AppDbContext ctx) =>
{

    var equipeId = piloto.equipeId;
    var equipe = ctx.Equipes.Find(equipeId);

    if (equipe is null)
    {
        return Results.BadRequest("Equipe não encontrada!");
    }

        piloto.equipe = equipe;
        ctx.Pilotos.Add(piloto);
        ctx.SaveChanges();
        return Results.Created("", piloto);

});

// Listagem de equipes e pilotos
app.MapGet("/F1/equipes/listar", ([FromServices] AppDbContext ctx) =>
{

    if (ctx.Equipes.Any())
    {
        return Results.Ok(ctx.Equipes.ToList());
    }
    return Results.NotFound("Não foram encontrados cadastros de equipes");

});

app.MapGet("/F1/pilotos/listar", ([FromServices] AppDbContext ctx) =>
{
    if (ctx.Pilotos.Any())
    {
        var pilotos = ctx.Pilotos.Include(p => p.equipe).ToList();
        return Results.Ok(pilotos);
    }
    return Results.NotFound("Não foram encontrados cadastros de equipes");
});

// Busca de equipes e pilotos
app.MapGet("/F1/equipes/buscar/{nome}", ([FromRoute] string nome, [FromServices] AppDbContext ctx) =>
{
    Equipe? equipe = ctx.Equipes.FirstOrDefault(e => e.nome.Contains(nome));
    if (equipe is null)
    {
        return Results.NotFound("Equipe não encontrada");
    }
    return Results.Ok(equipe);
});

app.MapGet("/F1/pilotos/buscar/{nome}", ([FromRoute] string nome, [FromServices] AppDbContext ctx) =>
{
    Piloto? piloto = ctx.Pilotos
        .Include(p => p.equipe)
        .FirstOrDefault(p => p.nome.Contains(nome));
    if (piloto is null)
    {
        return Results.NotFound("Piloto não encontrado");
    }
    return Results.Ok(piloto);
});

// Alteração de equipes e pilotos
app.MapPut("/F1/equipes/alterar/{nome}", ([FromRoute] string nome, [FromBody] Equipe equipeAlterada,
    [FromServices] AppDbContext ctx) =>
{
    Equipe? equipe = ctx.Equipes.FirstOrDefault(e => e.nome.Contains(nome));
    if (equipe is null)
    {
        return Results.NotFound("Equipe não encontrada");
    }
    equipe.nome = equipeAlterada.nome;
    equipe.paisOrigem = equipeAlterada.paisOrigem;
    equipe.dataFundacao = equipeAlterada.dataFundacao;
    ctx.Equipes.Update(equipe);
    ctx.SaveChanges();
    return Results.Ok(equipe);
});

app.MapPut("/F1/pilotos/alterar/{nome}", ([FromRoute] string nome, [FromBody] Piloto pilotoAlterado,
    [FromServices] AppDbContext ctx) =>
{
    Piloto? piloto= ctx.Pilotos.FirstOrDefault(p => p.nome.Contains(nome));
    if (piloto is null)
    {
        return Results.NotFound("Piloto não encontrado");
    }
    piloto.nome = pilotoAlterado.nome;
    piloto.nacionalidade = pilotoAlterado.nacionalidade;
    piloto.equipeId = pilotoAlterado.equipeId;
    var equipeId = pilotoAlterado.equipeId;
    var equipe = ctx.Equipes.Find(equipeId);
    piloto.equipe = equipe;
    ctx.Pilotos.Update(piloto);
    ctx.SaveChanges();
    return Results.Ok(piloto);
});

// Deletar equipes e pilotos
app.MapDelete("/F1/equipes/deletar/{nome}", ([FromRoute] string nome, [FromServices] AppDbContext ctx) =>
{
    Equipe? equipe = ctx.Equipes.FirstOrDefault(e => e.nome.ToLower().Trim() == nome.ToLower().Trim());
    if (equipe is null)
    {
        return Results.NotFound("Equipe não encontrada");
    }
    ctx.Equipes.Remove(equipe);
    ctx.SaveChanges();
    return Results.Ok(equipe);
});

app.MapDelete("/F1/pilotos/deletar/{nome}", ([FromRoute] string nome, [FromServices] AppDbContext ctx) =>
{
    Piloto? piloto = ctx.Pilotos
        .Include(p => p.equipe)
        .FirstOrDefault(p => p.nome.ToLower().Trim() == nome.ToLower().Trim());
    if (piloto is null)
    {
        return Results.NotFound("Piloto não encontrado");
    }
    ctx.Pilotos.Remove(piloto);
    ctx.SaveChanges();
    return Results.Ok(piloto);
});

//cadastro de pistas e corridas
app.MapPost("/F1/pistas/cadastrar", ([FromBody] Pista pista,
    [FromServices] AppDbContext ctx) =>
{
    ctx.Pistas.Add(pista);
    ctx.SaveChanges();
    return Results.Created("", pista);
});

app.MapPost("/F1/corridas/cadastrar", ([FromBody] Corrida corrida,
    [FromServices] AppDbContext ctx) =>
{
    var pistaId = corrida.pistaId;
    var pista = ctx.Pistas.Find(pistaId);

    if (pista is null)
    {
        return Results.BadRequest("Pista não encontrada!");
    }

    corrida.pista = pista;
    ctx.Corridas.Add(corrida);
    ctx.SaveChanges();
    return Results.Created("", corrida);
});

//listagem de pistas e corridas

app.MapGet("/F1/pistas/listar", ([FromServices] AppDbContext ctx) =>
{
    if (ctx.Pistas.Any())
    {
        return Results.Ok(ctx.Pistas.ToList());
    }
    return Results.NotFound("Não foram encontrados cadastros de pistas");
});

app.MapGet("/F1/corridas/listar", ([FromServices] AppDbContext ctx) =>
{
    if (ctx.Corridas.Any())
    {
        var corridas = ctx.Corridas.Include(c => c.pista).ToList();
        return Results.Ok(corridas);
    }
    return Results.NotFound("Não foram encontrados cadastros de corridas");
});

//busca de pistas e corridas

app.MapGet("/F1/pistas/buscar/{nome}", ([FromRoute] string nome, [FromServices] AppDbContext ctx) =>
{
    Pista? pista = ctx.Pistas.FirstOrDefault(p => p.nome.Contains(nome));
    if (pista is null)
    {
        return Results.NotFound("Pista não encontrada");
    }
    return Results.Ok(pista);
});

app.MapGet("/F1/corridas/buscar/{nome}", ([FromRoute] string nome, [FromServices] AppDbContext ctx) =>
{
    Corrida? corrida = ctx.Corridas
        .Include(c => c.pista)
        .FirstOrDefault(c => c.nomeEvento.Contains(nome));
    if (corrida is null)
    {
        return Results.NotFound("Corrida não encontrada");
    }
    return Results.Ok(corrida);
});

//alteração de pistas e corridas

app.MapPut("/F1/pistas/alterar/{nome}", ([FromRoute] string nome, [FromBody] Pista pistaAlterada,
    [FromServices] AppDbContext ctx) =>
{
    Pista? pista = ctx.Pistas.FirstOrDefault(p => p.nome.Contains(nome));
    if (pista is null)
    {
        return Results.NotFound("Pista não encontrada");
    }
    pista.nome = pistaAlterada.nome;
    pista.pais = pistaAlterada.pais;
    pista.distancia = pistaAlterada.distancia;
    pista.dataFundacao = pistaAlterada.dataFundacao;
    ctx.Pistas.Update(pista);
    ctx.SaveChanges();
    return Results.Ok(pista);
});

app.MapPut("/F1/corridas/alterar/{nome}", ([FromRoute] string nome, [FromBody] Corrida corridaAlterada,
    [FromServices] AppDbContext ctx) =>
{
    Corrida? corrida = ctx.Corridas.FirstOrDefault(c => c.nomeEvento.Contains(nome));
    if (corrida is null)
    {
        return Results.NotFound("Corrida não encontrada");
    }
    corrida.nomeEvento = corridaAlterada.nomeEvento;
    corrida.voltas = corridaAlterada.voltas;
    corrida.dataEvento = corridaAlterada.dataEvento;
    corrida.pistaId = corridaAlterada.pistaId;
    corrida.vencedorID = corridaAlterada.vencedorID;
    corrida.segundoID = corridaAlterada.segundoID;
    corrida.terceiroID = corridaAlterada.terceiroID;
    ctx.Corridas.Update(corrida);
    ctx.SaveChanges();
    return Results.Ok(corrida);
});

//deletar pistas e corridas

app.MapDelete("/F1/pistas/deletar/{nome}", ([FromRoute] string nome, [FromServices] AppDbContext ctx) =>
{
    Pista? pista = ctx.Pistas.FirstOrDefault(p => p.nome.ToLower().Trim() == nome.ToLower().Trim());
    if (pista is null)
    {
        return Results.NotFound("Pista não encontrada");
    }
    ctx.Pistas.Remove(pista);
    ctx.SaveChanges();
    return Results.Ok(pista);
});

app.MapDelete("/F1/corridas/deletar/{nome}", ([FromRoute] string nome, [FromServices] AppDbContext ctx) =>
{
    Corrida? corrida = ctx.Corridas
        .Include(c => c.pista)
        .FirstOrDefault(c => c.nomeEvento.ToLower().Trim() == nome.ToLower().Trim());
    if (corrida is null)
    {
        return Results.NotFound("Corrida não encontrada");
    }
    ctx.Corridas.Remove(corrida);
    ctx.SaveChanges();
    return Results.Ok(corrida);
});

//cadastro de torneios
app.MapPost("/F1/torneios/cadastrar", ([FromBody] Torneio torneio,
    [FromServices] AppDbContext ctx) =>
{
    ctx.Torneios.Add(torneio);
    ctx.SaveChanges();
    return Results.Created("", torneio);
});

//listagem de torneios
app.MapGet("/F1/torneios/listar", ([FromServices] AppDbContext ctx) =>
{
    if (ctx.Torneios.Any())
    {
        var torneios = ctx.Torneios
            .Include(t => t.vencedor)
            .Include(t => t.EquipeVencedora)
            .ToList();
        return Results.Ok(torneios);
    }
    return Results.NotFound("Não foram encontrados cadastros de torneios");
});

//busca de torneios
app.MapGet("/F1/torneios/buscar/{ano}", ([FromRoute] string ano, [FromServices] AppDbContext ctx) =>
{
    Torneio? torneio = ctx.Torneios
        .Include(t => t.vencedor)
        .Include(t => t.EquipeVencedora)
        .FirstOrDefault(t => t.ano.Contains(ano));
    if (torneio is null)
    {
        return Results.NotFound("Torneio não encontrado");
    }
    return Results.Ok(torneio);
});

//alteração de torneios
app.MapPut("/F1/torneios/alterar/{ano}", ([FromRoute] string ano, [FromBody] Torneio torneioAlterado,
    [FromServices] AppDbContext ctx) =>
{
    Torneio? torneio = ctx.Torneios.FirstOrDefault(t => t.ano.Contains(ano));
    if (torneio is null)
    {
        return Results.NotFound("Torneio não encontrado");
    }
    torneio.ano = torneioAlterado.ano;
    torneio.numCorridas = torneioAlterado.numCorridas;
    torneio.vencedorID = torneioAlterado.vencedorID;
    torneio.EquipeVencedoraID = torneioAlterado.EquipeVencedoraID;
    ctx.Torneios.Update(torneio);
    ctx.SaveChanges();
    return Results.Ok(torneio);
});

//deletar torneios
app.MapDelete("/F1/torneios/deletar/{ano}", ([FromRoute] string ano, [FromServices] AppDbContext ctx) =>
{
    Torneio? torneio = ctx.Torneios.FirstOrDefault(t => t.ano.ToLower().Trim() == ano.ToLower().Trim());
    if (torneio is null)
    {
        return Results.NotFound("Torneio não encontrado");
    }
    ctx.Torneios.Remove(torneio);
    ctx.SaveChanges();
    return Results.Ok(torneio);
});

app.UseCors("AllowAll");

app.Run();
