using LachoneteApi.Models;

namespace LachoneteApi.Repositories.Product;

public interface IProdutoRepository
{
    Task<Produto> GetProdutoById(Guid id);
    Task<List<Produto>> ListarProdutos();
    Task AdicionarProduto(Produto produto);
    Task Salvar();
    Task DeletarProduto(Guid id);
}
