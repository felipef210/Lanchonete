using System.ComponentModel.DataAnnotations;

namespace LachoneteApi.Dto.User;

public class EditarPerfilDto
{
    [Required(ErrorMessage = "Você deve preencher o campo {0}")]
    public string Nome { get; set; } = string.Empty;
    [Required(ErrorMessage = "Você deve preencher o campo {0}")]
    public string Telefone { get; set; } = string.Empty;
    [Required(ErrorMessage = "Você deve preencher o campo {0}")]
    public string Email { get; set; } = string.Empty;
}
