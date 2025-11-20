using LachoneteApi.Dto.Product;
using LachoneteApi.Services.Product;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LachoneteApi.Controllers;

[Route("[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "admin")]
public class ProdutoController : Controller
{
    private readonly IProdutoService _produtoService;

    public ProdutoController(IProdutoService produtoService)
    {
        _produtoService = produtoService;
    }

    [HttpGet("listar")]
    [AllowAnonymous]
    public async Task<ActionResult<List<ProdutoDto>>> ListarProdutos()
    {
        var produtos = await _produtoService.ListarProdutos();
        return Ok(produtos);
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<ActionResult<ProdutoDto>> GetProdutoById(Guid id)
    {
        var produto = await _produtoService.GetProdutoById(id);
        return Ok(produto);
    }

    [HttpPost]
    public async Task<ActionResult<ProdutoDto>> AdicionarProduto([FromBody] CriarProdutoDto criarProdutoDto)
    {
        var produto = await _produtoService.AdicionarProduto(criarProdutoDto);
        return Ok(produto);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ProdutoDto>> EditarProduto(Guid id, [FromBody] EditarProdutoDto editarProdutoDto)
    {
        var produto = await _produtoService.EditarProduto(id, editarProdutoDto);
        return Ok(produto);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletarProduto(Guid id)
    {
        await _produtoService.DeletarProduto(id);
        return NoContent();
    }
}
