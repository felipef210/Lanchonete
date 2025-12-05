using AutoMapper;
using LachoneteApi.Dto.Order;
using LachoneteApi.Exceptions;
using LachoneteApi.Models;
using LachoneteApi.Repositories.Order;
using LachoneteApi.Repositories.Product;
using LachoneteApi.Repositories.User;
using Microsoft.AspNetCore.Mvc;

namespace LachoneteApi.Services.Order;

public class PedidoService : IPedidoService
{
    private readonly IPedidoRepository _pedidoRepository;
    private readonly IProdutoRepository _produtoRepository;
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public PedidoService(IPedidoRepository pedidoRepository, IMapper mapper, IProdutoRepository produtoRepository, IHttpContextAccessor httpContextAccessor, IUsuarioRepository usuarioRepository)
    {
        _pedidoRepository = pedidoRepository;
        _mapper = mapper;
        _produtoRepository = produtoRepository;
        _httpContextAccessor = httpContextAccessor;
        _usuarioRepository = usuarioRepository;
    }

    public async Task<PedidoDto> CriarPedido([FromBody] CriarPedidoDto criarPedidoDto)
    {
        var usuario = await ObterUsuarioLogado();

        var pedido = _mapper.Map<Pedido>(criarPedidoDto);
        pedido.ClienteId = usuario.Id;
        pedido.Cliente = await _usuarioRepository.GetUserById(usuario.Id);

        await _pedidoRepository.CriarPedido(pedido); 

        pedido.Total = await AdicionarItensPedido(pedido, criarPedidoDto.Itens);
        pedido.Status = Enums.StatusPedidoEnum.Aberto;

        await _pedidoRepository.SalvarPedido();

        return _mapper.Map<PedidoDto>(pedido);
    }

    public async Task<List<PedidoDto>> ListarPedidos()
    {
        var pedidos = await _pedidoRepository.ListarPedidos();
        var pedidosDto = _mapper.Map<List<PedidoDto>>(pedidos);

        return pedidosDto;
    }

    public async Task<List<PedidoDto>> ListarPedidosPorUsuario()
    {
        var usuario = await ObterUsuarioLogado();
        var pedidos = await _pedidoRepository.ListarPedidosPorUsuario(usuario.Id);
        var pedidosDto = _mapper.Map<List<PedidoDto>>(pedidos);

        return pedidosDto;
    }

    public async Task<List<PedidoDto>> ListarPedidosEmAberto()
    {
        var pedidosEmAberto = await _pedidoRepository.ListarPedidosEmAberto();
        var pedidosEmAbertoDto = _mapper.Map<List<PedidoDto>>(pedidosEmAberto);
        return pedidosEmAbertoDto;
    }

    public async Task<PedidoDto> GetPedidoById(Guid id)
    {
        var usuario = await ObterUsuarioLogado();
        var pedido = await _pedidoRepository.GetPedidoById(id);

        if (pedido is null)
            throw new NaoEncontradoException($"Pedido não encontrado!");

        ValidaPermissao(pedido, usuario);

        var pedidoDto = _mapper.Map<PedidoDto>(pedido);

        return pedidoDto;
    }

    public async Task DeletarPedido(Guid id)
    {
        var usuario = await ObterUsuarioLogado();
        var pedido = await _pedidoRepository.GetPedidoById(id);

        if (pedido is null)
            throw new NaoEncontradoException("Pedido não encontrado");

        ValidaPermissao(pedido, usuario);

        await _pedidoRepository.DeletarPedido(id);
    }

    public async Task<PedidoDto> AtualizarPedido(Guid id, [FromBody] AtualizarPedidoDto atualizarPedidoDto)
    {
        var usuario = await ObterUsuarioLogado();
        var pedido = await _pedidoRepository.GetPedidoById(id);

        if (pedido is null)
            throw new NaoEncontradoException($"Pedido não encontrado!");

        ValidaPermissao(pedido, usuario);

        pedido.Status = atualizarPedidoDto.Status;

        await _pedidoRepository.SalvarPedido();

        return _mapper.Map<PedidoDto>(pedido);
    }

    private void ValidaPermissao(Pedido pedido, Usuario usuario)
    {
        if (pedido.ClienteId != usuario.Id && usuario.TipoUsuario != Enums.TipoUsuarioEnum.Administrador)
            throw new ProibidoException("Função não autorizada!");
    }

    private async Task<Usuario> ObterUsuarioLogado()
    {
        var userIdString = _httpContextAccessor.HttpContext?.User?.FindFirst("id")?.Value;

        if (!Guid.TryParse(userIdString, out Guid userId))
            throw new ParametroInvalidoException("ID do usuário inválido!");

        return await _usuarioRepository.GetUserById(userId)
            ?? throw new NaoEncontradoException("Usuário não encontrado!");
    }

    private async Task<decimal> AdicionarItensPedido(Pedido pedido, List<CriarItemPedidoDto> itensDto)
    {
        if (itensDto.Count <= 0)
            throw new ParametroInvalidoException("Insira itens no seu pedido!");

        decimal total = 0;

        foreach (var itemDto in itensDto)
        {
            var produto = await _produtoRepository.GetProdutoById(itemDto.ProdutoId)
                ?? throw new NaoEncontradoException("Produto não encontrado!");

            var item = new ItemPedido
            {
                PedidoId = pedido.Id,
                ProdutoId = produto.Id,
                PrecoUnitario = produto.Preco,
                Quantidade = itemDto.Quantidade
            };

            total += item.PrecoUnitario * itemDto.Quantidade;
            pedido.Itens.Add(item);
        }

        return total;
    }
}
