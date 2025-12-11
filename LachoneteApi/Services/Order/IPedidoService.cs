using LachoneteApi.Dto.Order;
using LachoneteApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace LachoneteApi.Services.Order;

public interface IPedidoService
{
    Task<PedidoDto> CriarPedido([FromBody] CriarPedidoDto criarPedidoDto);
    Task<List<PedidoDto>> ListarPedidos();
    Task<PedidoDto> GetPedidoById(Guid id);
    Task DeletarPedido(Guid id);
    Task<PedidoDto> AtualizarStatusPedido(Guid id, AtualizarStatusPedidoDto atualizarPedidoDto);
    Task<PedidoDto> EditarPedido(Guid id, [FromBody] EditarPedidoDto editarPedidoDto);
    Task<List<PedidoDto>> ListarPedidosPorUsuario();
    Task<List<PedidoDto>> ListarPedidosEmAberto();
}