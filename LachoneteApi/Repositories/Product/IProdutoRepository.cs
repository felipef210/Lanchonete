using LachoneteApi.Models;

namespace LachoneteApi.Repositories.Product;

public interface IProdutoRepository
{
    Task<Produto> GetProdutoById(Guid id);
    Task<List<Produto>> ListarProdutos();
    IQueryable<Produto> FiltrarPorCategoria(int categoria);
    IQueryable<Produto> FiltrarPorNome(string nome);
    Task AdicionarProduto(Produto produto);
    Task Salvar();
    Task DeletarProduto(Guid id);
    IQueryable<Produto> Query();
}
