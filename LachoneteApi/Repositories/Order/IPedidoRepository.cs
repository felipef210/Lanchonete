using LachoneteApi.Models;

namespace LachoneteApi.Repositories.Order;

public interface IPedidoRepository
{
    Task CriarPedido(Pedido pedido);
    Task<Pedido> GetPedidoById(Guid id);
    Task SalvarPedido();
    Task<List<Pedido>> ListarPedidos();
    Task DeletarPedido(Guid id);
}
