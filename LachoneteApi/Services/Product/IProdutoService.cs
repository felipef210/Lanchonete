using LachoneteApi.Dto.Product;
using Microsoft.AspNetCore.Mvc;

namespace LachoneteApi.Services.Product;

public interface IProdutoService
{
    Task<ProdutoDto> GetProdutoById(Guid id);
    Task<List<ProdutoDto>> ListarProdutos();
    Task<ProdutoDto> AdicionarProduto([FromBody] CriarProdutoDto criarProdutoDto);
    Task<ProdutoDto> EditarProduto(Guid id, [FromBody] EditarProdutoDto editarProdutoDto);
    Task DeletarProduto(Guid id);
}
