namespace LachoneteApi.Dto.Order;

public class PedidoDto
{
    public Guid Id { get; set; }
    public Guid ClienteId { get; set; }
    public List<ItemPedidoDto> Itens { get; set; } = new();
    public Decimal Total { get; set; }
}
