using LachoneteApi.Data;
using LachoneteApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LachoneteApi.Repositories.Order;

public class PedidoRepository : IPedidoRepository
{
    private readonly Context _context;

    public PedidoRepository(Context context)
    {
        _context = context;
    }

    public async Task CriarPedido(Pedido pedido)
    {
        _context.Pedidos.Add(pedido);
        await _context.SaveChangesAsync();
    }

    public async Task SalvarPedido()
    {
         await _context.SaveChangesAsync();
    }

    public async Task<Pedido> GetPedidoById(Guid id)
    {
        return await _context.Pedidos
            .Include(x => x.Cliente)
            .Include(p => p.Itens)
            .ThenInclude(i => i.Produto)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<List<Pedido>> ListarPedidos()
    {
        return await _context.Pedidos
            .Include(x => x.Cliente)
            .Include(p => p.Itens)
            .ThenInclude(i => i.Produto)
            .ToListAsync();
    }

    public async Task<List<Pedido>> ListarPedidosPorUsuario(Guid usuarioId)
    {
        return await _context.Pedidos
            .Include(x => x.Cliente)
            .Include(p => p.Itens)
            .ThenInclude(i => i.Produto)
            .Where(p => p.ClienteId == usuarioId)
            .ToListAsync();
    }

    public async Task<List<Pedido>> ListarPedidosEmAberto()
    {
        return await _context.Pedidos
            .Include(x => x.Cliente)
            .Include(p => p.Itens)
            .ThenInclude(i => i.Produto)
            .Where(p => p.Status == Enums.StatusPedidoEnum.Aberto)
            .ToListAsync();
    }

    public async Task DeletarPedido(Guid id)
    {
        var pedido = await GetPedidoById(id);

        if (pedido is null)
            return;
            
        _context.Pedidos.Remove(pedido);
        await _context.SaveChangesAsync();
    }
}
