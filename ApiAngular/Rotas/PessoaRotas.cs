using ApiAngular.Models;

namespace ApiAngular.Rotas
{
    public static class PessoaRotas
    {
        public static List<Pessoa> Pessoas = new()
        {
            new (Guid.NewGuid(), "Alex", "alex@alex.com", "123.456.789-00"),
            new (Guid.NewGuid(), "Robert", "robert@robert.com", "123.456.789-00"),
            new (Guid.NewGuid(), "Patty", "patty@patty.com", "123.456.789-00")
        };

        public static void MapPessoaRotas(this WebApplication app) 
        {
            app.MapGet("/pessoas", () => Pessoas);

            app.MapGet("/pessoas/{nome}",
                (string nome) => Pessoas.Find(x => x.Nome.StartsWith(nome)));

            app.MapPost("/pessoas", 
                (HttpContext request, Pessoa pessoa) =>
            {
                pessoa.Id = Guid.NewGuid();
                Pessoas.Add(pessoa);
                return Results.Ok(pessoa);
            });

            app.MapPut("/pessoas/{id:guid}", (Guid id, Pessoa Pessoa) =>
            {
                var encontrado = Pessoas.Find(x => x.Id == id);

                if (encontrado == null)
                    return Results.NotFound();

                encontrado.Nome = Pessoa.Nome;

                return Results.Ok(encontrado);
            });
        }
    }
}
