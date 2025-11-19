using LachoneteApi.Data;
using LachoneteApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LachoneteApi.Repositories.Product;

public class ProdutoRepository : IProdutoRepository
{
    private readonly Context _context;

    public ProdutoRepository(Context context)
    {
        _context = context;
    }

    public async Task<Produto> GetProdutoById(Guid id)
    {
        return await _context.Produtos.FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<List<Produto>> ListarProdutos()
    {
        return await _context.Produtos
            .Include(p => p.Categoria)
            .ToListAsync();
    }

    public async Task AdicionarProduto(Produto produto)
    {
        _context.Produtos.Add(produto);
        await _context.SaveChangesAsync();
    }

    public async Task Salvar()
    {
        await _context.SaveChangesAsync();
    }

    public async Task DeletarProduto(Guid id)
    {
        var produto = await GetProdutoById(id);

        if (produto is null)
            return;
        
        _context.Produtos.Remove(produto);
        await Salvar();
    }
}
