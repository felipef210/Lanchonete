using System.ComponentModel.DataAnnotations;
using LachoneteApi.Enums;

namespace LachoneteApi.Models;

public class Pedido
{
    [Key]
    public Guid Id { get; set; }
    public DateTime DataHora { get; set; } = DateTime.UtcNow;
    public Guid ClienteId { get; set; }
    public Usuario Cliente { get; set; } = null!;
    public StatusPedidoEnum Status { get; set; } = StatusPedidoEnum.Aberto;
    public decimal Total { get; set; }
    public List<ItemPedido> Itens { get; set; } = new();
}
