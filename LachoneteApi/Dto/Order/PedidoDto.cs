namespace LachoneteApi.Dto.Order;

public class PedidoDto
{
    public Guid Id { get; set; }
    public string Cliente { get; set; } = null!;
    public string DataHora { get; set; } = null!;
    public List<ItemPedidoDto> Itens { get; set; } = new();
    public Decimal Total { get; set; }
}
