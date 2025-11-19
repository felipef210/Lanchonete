using System.ComponentModel.DataAnnotations;

namespace LachoneteApi.Dto.User;

public class LoginDto
{
    [Required(ErrorMessage = "Você deve preencher o campo {0}")]
    public string Email { get; set; } = string.Empty;
    [Required(ErrorMessage = "Você deve preencher o campo {0}")]
    public string Senha { get; set; } = string.Empty;
}
