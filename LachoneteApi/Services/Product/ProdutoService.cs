using AutoMapper;
using LachoneteApi.Dto;
using LachoneteApi.Dto.Product;
using LachoneteApi.Exceptions;
using LachoneteApi.Models;
using LachoneteApi.Repositories.Product;
using LachoneteApi.Services.Azure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LachoneteApi.Services.Product;

public class ProdutoService : IProdutoService
{
    private readonly IProdutoRepository _produtoRepository;
    private readonly IFileStorage _fileStorage;
    private readonly IMapper _mapper;
    private readonly string container = "produtos";

    public ProdutoService(IProdutoRepository produtoRepository, IMapper mapper, IFileStorage fileStorage)
    {
        _produtoRepository = produtoRepository;
        _mapper = mapper;
        _fileStorage = fileStorage;
    }

    public async Task<ProdutoDto> GetProdutoById(Guid id)
    {
        var produto = await _produtoRepository.GetProdutoById(id);

        if (produto is null)
            throw new NaoEncontradoException("Produto não encontrado!");
        
        var produtoDto = _mapper.Map<ProdutoDto>(produto);

        return produtoDto;
    }

    public async Task<List<ProdutoDto>> ListarProdutos()
    {
        var produtos = await _produtoRepository.ListarProdutos();
        var produtosDto = _mapper.Map<List<ProdutoDto>>(produtos);

        return produtosDto;
    }

    public async Task<List<ProdutoDto>> FiltrarPorCategoria(int categoria)
    {
        if (categoria <= 0)
            return new List<ProdutoDto>();

        var query = _produtoRepository.FiltrarPorCategoria(categoria);

        var produtos = await query.ToListAsync();

        return _mapper.Map<List<ProdutoDto>>(produtos);
    }

    public async Task<PaginacaoDto<ProdutoDto>> FiltrarPorNome(int page, int pageSize, string nome)
    {
        IQueryable<Produto> query;

        if (string.IsNullOrWhiteSpace(nome))
            query = _produtoRepository.Query();
            
        else
            query = _produtoRepository.FiltrarPorNome(nome);

        var totalItems = await query.CountAsync();

        var produtos = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return new PaginacaoDto<ProdutoDto>
        {
            Page = page,
            PageSize = pageSize,
            TotalItems = totalItems,
            Items = _mapper.Map<List<ProdutoDto>>(produtos)
        };
    }

    public async Task<ProdutoDto> AdicionarProduto([FromForm] CriarProdutoDto criarProdutoDto)
    {
        ValidacoesDoProduto(criarProdutoDto.Nome, criarProdutoDto.Preco, criarProdutoDto.Descricao);

        var produto = _mapper.Map<Produto>(criarProdutoDto);

        if (criarProdutoDto.Imagem is not null)
        {
            var urlImagem = await _fileStorage.Store(container, criarProdutoDto.Imagem);
            produto.Imagem = urlImagem;
        }

        await _produtoRepository.AdicionarProduto(produto);

        return _mapper.Map<ProdutoDto>(produto);
    }

    public async Task<ProdutoDto> EditarProduto(Guid id, [FromForm] EditarProdutoDto editarProdutoDto)
    {
        var produto = await _produtoRepository.GetProdutoById(id);

        if (produto is null)
            throw new NaoEncontradoException("Produto não encontrado!");

        ValidacoesDoProduto(editarProdutoDto.Nome, editarProdutoDto.Preco, editarProdutoDto.Descricao);
        
        _mapper.Map(editarProdutoDto, produto);

        if (editarProdutoDto.Imagem is not null)
        {
            var urlImagem = await _fileStorage.Edit(produto.Imagem, container, editarProdutoDto.Imagem);
            produto.Imagem = urlImagem;
        }

        await _produtoRepository.Salvar();

        return _mapper.Map<ProdutoDto>(produto);
    }

    public async Task DeletarProduto(Guid id)
    {
        var produto = await _produtoRepository.GetProdutoById(id);

        if (produto is null)
            throw new NaoEncontradoException("Produto não encontrado!");

        await _produtoRepository.DeletarProduto(id);
    }

    private void ValidacoesDoProduto(string nome, decimal preco, string descricao)
    {
        if (nome is null)
            throw new ParametroInvalidoException("Insira o nome do produto!");

        if (preco < 0)
            throw new ParametroInvalidoException("O valor do produto deve ser positivo!");

        if (descricao is null)
            throw new ParametroInvalidoException("Insira a descrição do produto!");
    }
}
