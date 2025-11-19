using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LachoneteApi.Dto.Order
{
    public class CriarPedidoDto
    {
        [Required(ErrorMessage = "Você deve preencher o campo {0}")]
        public Guid ClienteId { get; set; }
        [Required(ErrorMessage = "Você deve preencher o campo {0}")]
        public List<ItemPedidoDto> Itens { get; set; } = new();
    }
}