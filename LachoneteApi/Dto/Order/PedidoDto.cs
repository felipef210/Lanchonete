using LachoneteApi.Enums;

namespace LachoneteApi.Dto.Order;

public class PedidoDto
{
    public Guid Id { get; set; }
    public string Cliente { get; set; } = null!;
    public DateTime DataHora { get; set; }
    public StatusPedidoEnum Status { get; set; }
    public bool PrimeiroPedido { get; set; } = false;
    public List<ItemPedidoDto> Itens { get; set; } = new();
    public Decimal Total { get; set; }
}
