using System.ComponentModel.DataAnnotations;

namespace LachoneteApi.Models;

public class Categoria
{
    [Key]
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public List<Produto> Produtos { get; set; } = new();
}
