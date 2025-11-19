namespace LachoneteApi.Dto.Product;

public class ProdutoDto
{
    public Guid Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public decimal Preco { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public int CategoriaId { get; set; }
}
