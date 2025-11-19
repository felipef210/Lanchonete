using System.ComponentModel.DataAnnotations;

namespace LachoneteApi.Dto.Order;

public class CadastroDto
{
    [Required(ErrorMessage = "Você deve preencher o campo {0}")]
    public string Nome { get; set; } = string.Empty;
    [Required(ErrorMessage = "Você deve preencher o campo {0}")]
    public string Telefone { get; set; } = string.Empty;
    [Required(ErrorMessage = "Você deve preencher o campo {0}")]
    public string Email { get; set; } = string.Empty;
    [Required(ErrorMessage = "Você deve preencher o campo {0}")]
    public string Senha { get; set; } = string.Empty;
    [Compare("Senha", ErrorMessage = "As senhas devem coincidir")]
    [Required(ErrorMessage = "Você deve preencher o campo {0}")]
    public string ConfirmarSenha { get; set; } = string.Empty;
}
