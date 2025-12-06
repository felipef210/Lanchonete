using System.ComponentModel.DataAnnotations;
using LachoneteApi.Enums;

namespace LachoneteApi.Models;

public class Usuario
{
    [Key]
    public Guid Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Telefone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Senha { get; set; } = string.Empty;
    public TipoUsuarioEnum TipoUsuario { get; set; } = TipoUsuarioEnum.Cliente;
    public List<Pedido>? Pedidos { get; set; }
}
