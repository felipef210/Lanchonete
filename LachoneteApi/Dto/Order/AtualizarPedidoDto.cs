using LachoneteApi.Enums;

namespace LachoneteApi.Dto.Order;

public class AtualizarPedidoDto
{
    public StatusPedidoEnum Status { get; set; }
    public List<CriarItemPedidoDto> Itens { get; set; } = new();
}
