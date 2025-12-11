using System.ComponentModel.DataAnnotations;

namespace LachoneteApi.Dto.Order;

public class EditarItemPedidoDto : IItemPedidoDto
{
    [Required(ErrorMessage = "Você deve preencher o campo {0}")]
    public Guid ProdutoId { get; set; }
    [Required(ErrorMessage = "Você deve preencher o campo {0}")]
    public int Quantidade { get; set; }
}
