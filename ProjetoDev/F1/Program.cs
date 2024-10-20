// Código feito por: Bruno Trevizan Rizzatto, Luiz Fernando de Castro Simm e Yuji Chikara Kiyota
using F1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
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

app.Run();
