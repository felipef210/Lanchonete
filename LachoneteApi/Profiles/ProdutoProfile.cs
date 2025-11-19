using AutoMapper;
using LachoneteApi.Dto.Product;
using LachoneteApi.Models;

namespace LachoneteApi.Profiles;

public class ProdutoProfile : Profile
{
    public ProdutoProfile()
    {
        CreateMap<CriarProdutoDto, Produto>();
        CreateMap<Produto, ProdutoDto>();
        CreateMap<EditarProdutoDto, Produto>();
    }
}
