using System.ComponentModel.DataAnnotations;

namespace LachoneteApi.Models;

public class ItemPedido
{
    [Key]
    public Guid Id { get; set; }
    public Guid PedidoId { get; set; }
    public Pedido Pedido { get; set; } = null!;
    public Guid ProdutoId { get; set; }
    public Produto Produto { get; set; } = null!;

    public int Quantidade { get; set; }

    public decimal PrecoUnitario { get; set; }

    public string? Observacao { get; set; }
}
