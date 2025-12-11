using LachoneteApi.Dto.Order;
using LachoneteApi.Services.Order;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LachoneteApi.Controllers;

[Route("[controller]")]
[ApiController]
[Authorize]
public class PedidoController : Controller
{
    private readonly IPedidoService _pedidoService;

    public PedidoController(IPedidoService pedidoService)
    {
        _pedidoService = pedidoService;
    }

    [HttpPost]
    public async Task<ActionResult<PedidoDto>> CriarPedido([FromBody] CriarPedidoDto criarPedidoDto)
    {
        var pedido = await _pedidoService.CriarPedido(criarPedidoDto);
        return Ok(pedido);
    }

    [HttpGet("listar")]
    [Authorize(Policy = "admin")]
    public async Task<ActionResult<List<PedidoDto>>> ListarPedidos()
    {
        var pedidos = await _pedidoService.ListarPedidos();
        return Ok(pedidos);
    }

    [HttpGet("listarPorUsuario")]
    public async Task<ActionResult<List<PedidoDto>>> ListarPedidosPorUsuario()
    {
        var pedidos = await _pedidoService.ListarPedidosPorUsuario();
        return Ok(pedidos);
    }

    [HttpGet("pedidosEmAberto")]
    [Authorize(Policy = "admin")]
    public async Task<ActionResult<List<PedidoDto>>> ListarPedidosEmAberto()
    {
        var pedidosEmAberto = await _pedidoService.ListarPedidosEmAberto();
        return Ok(pedidosEmAberto);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<PedidoDto>> GetPedidoById(Guid id)
    {
        var pedido = await _pedidoService.GetPedidoById(id);
        return Ok(pedido);
    }

    [HttpPatch("{id}")]
    [Authorize(Policy = "admin")]
    public async Task<ActionResult<PedidoDto>> AtualizarPedido(Guid id, [FromBody] AtualizarStatusPedidoDto dto)
    {
        var pedidoAtualizado = await _pedidoService.AtualizarStatusPedido(id, dto);
        return Ok(pedidoAtualizado);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<PedidoDto>> EditarPedido(Guid id, [FromBody] EditarPedidoDto dto)
    {
        var pedidoAtualizado = await _pedidoService.EditarPedido(id, dto);
        return Ok(pedidoAtualizado);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletarPedido(Guid id)
    {
        await _pedidoService.DeletarPedido(id);
        return NoContent();
    }
}
