namespace LachoneteApi.Dto.Product;

public class EditarProdutoDto
{
    public string Nome { get; set; } = string.Empty;
    public decimal Preco { get; set; }
    public string Descricao { get; set; } = string.Empty;
}
