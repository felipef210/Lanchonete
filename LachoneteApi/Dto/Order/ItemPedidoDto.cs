using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LachoneteApi.Dto.Order
{
    public class ItemPedidoDto
    {
        public Guid ProdutoId { get; set; }
        public string ProdutoNome { get; set; } = null!;
        public decimal ProdutoPreco { get; set; }
        public int Quantidade { get; set; }
    }
}