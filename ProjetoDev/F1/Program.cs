// Código feito por: Bruno Trevizan Rizzatto, Luiz Fernando de Castro Simm e Yuji Chikara Kiyota
using F1.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
var app = builder.Build();

// Página Inicial
app.MapGet("/", () => "Bem vindo ao F1!");

// Cadastro de equipes e pilotos
app.MapPost("/F1/equipes/cadastrar", ([FromBody] Equipe equipe,
    [FromServices] AppDbContext ctx) =>
{
    if (ctx.Equipes.Count() <= 12)
    {
        ctx.Equipes.Add(equipe);
        ctx.SaveChanges();
        return Results.Created("", equipe);
    }
    return Results.BadRequest("O limite de equipes foi atingido!");
});

app.MapPost("/F1/pilotos/cadastrar", ([FromBody] Piloto piloto, [FromQuery] int equipeId,
    [FromServices] AppDbContext ctx) =>
{
    var equipe = ctx.Equipes.Find(equipeId);
    if (equipe is null)
    {
        return Results.BadRequest("Equipe não encontrada!");
    }
    if (equipe.pilotos.Count < 2)
    {
        piloto.equipe = equipe;
        ctx.Pilotos.Add(piloto);
        ctx.SaveChanges();
        return Results.Created("", piloto);
    }
    
    return Results.BadRequest("A equipe já possui 2 pilotos!");
});

// Listagem de equipes e pilotos
app.MapGet("/F1/equipe/listar", ([FromServices] AppDbContext ctx) =>
{
    if (ctx.Equipes.Any())
    {
        return Results.Ok(ctx.Equipes.ToList());
    }
    return Results.NotFound();
});

app.MapGet("/F1/pilotos/listar", ([FromServices] AppDbContext ctx) =>
{
    if (ctx.Pilotos.Any())
    {
        return Results.Ok(ctx.Pilotos.ToList());
    }
    return Results.NotFound();
});

// Busca de equipes e pilotos
app.MapGet("/F1/equipe/buscar/{nome}", ([FromRoute] string nome, [FromServices] AppDbContext ctx) =>
{
    Equipe? equipe = ctx.Equipes.Find(nome);
    if (equipe is null)
    {
        return Results.NotFound();
    }
    return Results.Ok(equipe);
});

app.MapGet("/F1/piloto/buscar/{nome}", ([FromRoute] string nome, [FromServices] AppDbContext ctx) =>
{
    Piloto? piloto = ctx.Pilotos.Find(nome);
    if (piloto is null)
    {
        return Results.NotFound();
    }
    return Results.Ok(piloto);
});

// Alteração de equipes e pilotos
app.MapPut("/F1/equipe/alterar/{nome}", ([FromRoute] string nome, [FromBody] Equipe equipeAlterada,
    [FromServices] AppDbContext ctx) =>
{
    Equipe? equipe = ctx.Equipes.Find(nome);
    if (equipe is null)
    {
        return Results.NotFound();
    }
    equipe.nome = equipeAlterada.nome;
    equipe.paisOrigem = equipeAlterada.paisOrigem;
    equipe.dataFundacao = equipeAlterada.dataFundacao;
    ctx.Equipes.Update(equipe);
    ctx.SaveChanges();
    return Results.Ok(equipe);
});

app.MapPut("/F1/piloto/alterar/{nome}", ([FromRoute] string nome, [FromBody] Piloto pilotoAlterado,
    [FromServices] AppDbContext ctx) =>
{
    Piloto? piloto = ctx.Pilotos.Find(nome);
    if (piloto is null)
    {
        return Results.NotFound();
    }
    piloto.nome = pilotoAlterado.nome;
    piloto.nacionalidade = pilotoAlterado.nacionalidade;
    piloto.equipeId = pilotoAlterado.equipeId;
    ctx.Pilotos.Update(piloto);
    ctx.SaveChanges();
    return Results.Ok(piloto);
});

// Deletar equipes e pilotos
app.MapDelete("/F1/equipe/deletar/{nome}", ([FromRoute] string nome, [FromServices] AppDbContext ctx) =>
{
    Equipe? equipe = ctx.Equipes.Find(nome);
    if (equipe is null)
    {
        return Results.NotFound();
    }
    ctx.Equipes.Remove(equipe);
    ctx.SaveChanges();
    return Results.Ok(equipe);
});

app.MapDelete("/F1/piloto/deletar/{nome}", ([FromRoute] string nome, [FromServices] AppDbContext ctx) =>
{
    Piloto? piloto = ctx.Pilotos.Find(nome);
    if (piloto is null)
    {
        return Results.NotFound();
    }
    ctx.Pilotos.Remove(piloto);
    ctx.SaveChanges();
    return Results.Ok(piloto);
});

app.Run();
