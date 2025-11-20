using System.ComponentModel.DataAnnotations;

namespace LachoneteApi.Dto.Order;

public class CriarPedidoDto
{
    [Required(ErrorMessage = "Você deve preencher o campo {0}")]
    public List<CriarItemPedidoDto> Itens { get; set; } = new();
}
