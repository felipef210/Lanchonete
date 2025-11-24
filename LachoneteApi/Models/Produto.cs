using System.ComponentModel.DataAnnotations;

namespace LachoneteApi.Models;

public class Produto
{
    [Key]
    public Guid Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public decimal Preco { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public string Imagem { get; set; } = string.Empty;
    public int CategoriaId { get; set; }
    public Categoria Categoria { get; set; } = null!;
}
