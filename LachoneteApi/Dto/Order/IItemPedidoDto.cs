namespace LachoneteApi.Dto.Order;

public interface IItemPedidoDto
{
    public Guid ProdutoId { get; set; }
    public int Quantidade { get; set; }
}
