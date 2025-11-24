using System.ComponentModel.DataAnnotations;

namespace LachoneteApi.Dto.Product;

public class CriarProdutoDto
{
    [Required(ErrorMessage = "Você deve preencher o campo {0}")]
    public string Nome { get; set; } = string.Empty;
    [Required(ErrorMessage = "Você deve preencher o campo {0}")]
    public decimal Preco { get; set; }
    [Required(ErrorMessage = "Você deve preencher o campo {0}")]
    public string Descricao { get; set; } = string.Empty;
    [Required(ErrorMessage = "Você deve preencher o campo {0}")]
    public IFormFile Imagem { get; set; } = null!;
    [Required(ErrorMessage = "Você deve preencher o campo {0}")]
    public int CategoriaId { get; set; }
}
