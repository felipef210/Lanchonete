using AutoMapper;
using LachoneteApi.Dto.Product;
using LachoneteApi.Models;
using LachoneteApi.Repositories.Product;
using Microsoft.AspNetCore.Mvc;

namespace LachoneteApi.Services.Product;

public class ProdutoService : IProdutoService
{
    private readonly IProdutoRepository _produtoRepository;
    private readonly IMapper _mapper;

    public ProdutoService(IProdutoRepository produtoRepository, IMapper mapper)
    {
        _produtoRepository = produtoRepository;
        _mapper = mapper;
    }

    public async Task<ProdutoDto> GetProdutoById(Guid id)
    {
        var produto = await _produtoRepository.GetProdutoById(id);

        if (produto is null)
            throw new Exception("Produto não encontrado!");
        
        var produtoDto = _mapper.Map<ProdutoDto>(produto);

        return produtoDto;
    }

    public async Task<List<ProdutoDto>> ListarProdutos()
    {
        var produtos = await _produtoRepository.ListarProdutos();
        var produtosDto = _mapper.Map<List<ProdutoDto>>(produtos);

        return produtosDto;
    }

    public async Task<ProdutoDto> AdicionarProduto([FromBody] CriarProdutoDto criarProdutoDto)
    {
        var produto = _mapper.Map<Produto>(criarProdutoDto);
        await _produtoRepository.AdicionarProduto(produto);

        return _mapper.Map<ProdutoDto>(produto);
    }

    public async Task<ProdutoDto> EditarProduto(Guid id, [FromBody] EditarProdutoDto editarProdutoDto)
    {
        var produto = _produtoRepository.GetProdutoById(id);

        if (produto is null)
            throw new Exception("Produto não encontrado!");

        await _mapper.Map(editarProdutoDto, produto);

        await _produtoRepository.Salvar();

        return _mapper.Map<ProdutoDto>(produto);
    }

    public async Task DeletarProduto(Guid id)
    {
        var produto = await _produtoRepository.GetProdutoById(id);

        if (produto is null)
            throw new Exception("Produto não encontrado!");

        await _produtoRepository.DeletarProduto(id);
    }
}
