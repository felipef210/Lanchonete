using AutoMapper;
using LachoneteApi.Dto.Order;
using LachoneteApi.Models;

namespace LachoneteApi.Profiles;

public class PedidoProfile : Profile
{
    public PedidoProfile()
    {
        CreateMap<CriarPedidoDto, Pedido>()
            .ForMember(dest => dest.Itens, opt => opt.Ignore())
            .ForMember(dest => dest.Total, opt => opt.Ignore());

        CreateMap<Pedido, PedidoDto>()
            .ForMember(dest => dest.Cliente, opt => opt.MapFrom(src => src.Cliente.Nome));
        
        CreateMap<ItemPedido, ItemPedidoDto>()
            .ForMember(det => det.ProdutoPreco, opt => opt.MapFrom(src => src.Produto.Preco))
            .ForMember(dest => dest.ProdutoNome, opt => opt.MapFrom(src => src.Produto.Nome));
    }
}
