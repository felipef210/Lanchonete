using LachoneteApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LachoneteApi.Data;

public class Context : DbContext
{
    public Context(DbContextOptions<Context> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Usuario>()
            .HasMany(u => u.Pedidos)
            .WithOne(p => p.Cliente)
            .HasForeignKey(p => p.ClienteId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Categoria>().HasData(
            new Categoria { Id = 1, Nome = "Lanches" },
            new Categoria { Id = 2, Nome = "Sobremesas" },
            new Categoria { Id = 3, Nome = "Acompanhamentos" },
            new Categoria { Id = 4, Nome = "Bebidas" }
        );
    }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Produto> Produtos { get; set; }
    public DbSet<Pedido> Pedidos { get; set; }
    public DbSet<ItemPedido> ItensPedido { get; set; }


}
