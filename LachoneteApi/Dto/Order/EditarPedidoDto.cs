namespace LachoneteApi.Dto.Order;

public class EditarPedidoDto
{
    public List<EditarItemPedidoDto> Itens { get; set; } = new();
}
