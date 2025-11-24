using AutoMapper;
using LachoneteApi.Dto.Product;
using LachoneteApi.Models;

namespace LachoneteApi.Profiles;

public class ProdutoProfile : Profile
{
    public ProdutoProfile()
    {
        CreateMap<CriarProdutoDto, Produto>()
            .ForMember(dest => dest.Imagem, opt => opt.Ignore());
            
        CreateMap<Produto, ProdutoDto>();

        CreateMap<EditarProdutoDto, Produto>()
            .ForMember(dest => dest.Imagem, opt => opt.Ignore());
    }
}
