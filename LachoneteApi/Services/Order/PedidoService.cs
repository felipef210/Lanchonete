using AutoMapper;
using LachoneteApi.Dto.Order;
using LachoneteApi.Models;
using LachoneteApi.Repositories.Order;
using LachoneteApi.Repositories.Product;
using Microsoft.AspNetCore.Mvc;

namespace LachoneteApi.Services.Order;

public class PedidoService : IPedidoService
{
    private readonly IPedidoRepository _pedidoRepository;
    private readonly IProdutoRepository _produtoRepository;
    private readonly IMapper _mapper;

    public PedidoService(IPedidoRepository pedidoRepository, IMapper mapper, IProdutoRepository produtoRepository)
    {
        _pedidoRepository = pedidoRepository;
        _mapper = mapper;
        _produtoRepository = produtoRepository;
    }

    public async Task<PedidoDto> CriarPedido([FromBody] CriarPedidoDto criarPedidoDto)
    {
        // 1. Criar pedido vazio
        var pedido = _mapper.Map<Pedido>(criarPedidoDto);

        await _pedidoRepository.CriarPedido(pedido); 
        // Agora pedido.Id existe

        decimal total = 0;

        // 2. Adicionar itens
        foreach (var itemDto in criarPedidoDto.Itens)
        {
            var produto = await _produtoRepository.GetProdutoById(itemDto.ProdutoId);

            if (produto == null)
                throw new Exception($"Produto não encontrado: {itemDto.ProdutoId}");

            var item = new ItemPedido
            {
                PedidoId = pedido.Id,
                ProdutoId = produto.Id,
                PrecoUnitario = produto.Preco,
                Quantidade = itemDto.Quantidade,
            };

            total += produto.Preco * itemDto.Quantidade;
            pedido.Itens.Add(item);
        }

        // 3. Atualizar total e status do pedido
        pedido.Total = total;
        pedido.Status = Enums.StatusPedidoEnum.EmPreparacao;

        // Salvar itens
       await _pedidoRepository.SalvarPedido();

        // 4. Mapear saída
        return _mapper.Map<PedidoDto>(pedido);
    }

    public async Task<List<PedidoDto>> ListarPedidos()
    {
        var pedidos = await _pedidoRepository.ListarPedidos();
        var pedidosDto = _mapper.Map<List<PedidoDto>>(pedidos);

        return pedidosDto;
    }

    public async Task<PedidoDto> GetPedidoById(Guid id)
    {
        var pedido = await _pedidoRepository.GetPedidoById(id);

        if (pedido is null)
            throw new Exception("Pedido não encontrado");

        var pedidoDto = _mapper.Map<PedidoDto>(pedido);

        return pedidoDto;
    }

    public async Task DeletarPedido(Guid id)
    {
        var pedido = await _pedidoRepository.GetPedidoById(id);

        if (pedido is null)
            throw new Exception("Pedido não encontrado");

        await _pedidoRepository.DeletarPedido(id);
    }

    public async Task<PedidoDto> AtualizarPedido(Guid id, [FromBody] AtualizarPedidoDto atualizarPedidoDto)
    {
        // 1. Buscar pedido existente
        var pedido = await _pedidoRepository.GetPedidoById(id);

        if (pedido == null)
            throw new Exception("Pedido não encontrado");

        // 2. Atualizar dados simples
        _mapper.Map(atualizarPedidoDto, pedido);

        // 3. Atualizar os itens (caso permitido)
        pedido.Itens.Clear();
        decimal total = 0;

        foreach (var itemDto in atualizarPedidoDto.Itens)
        {
            var produto = await _produtoRepository.GetProdutoById(itemDto.ProdutoId);

            if (produto == null)
                throw new Exception($"Produto inválido: {itemDto.ProdutoId}");

            var item = new ItemPedido
            {
                PedidoId = pedido.Id,
                ProdutoId = produto.Id,
                PrecoUnitario = produto.Preco, // Preço congelado
                Quantidade = itemDto.Quantidade
            };

            total += item.PrecoUnitario * itemDto.Quantidade;
            pedido.Itens.Add(item);
        }

        // 4. Recalcular total
        pedido.Total = total;

        // 5. Salvar alterações
        await _pedidoRepository.SalvarPedido();

        // 6. Retornar DTO
        return _mapper.Map<PedidoDto>(pedido);
    }
}
