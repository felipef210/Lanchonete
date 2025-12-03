using AutoMapper;
using LachoneteApi.Dto.Order;
using LachoneteApi.Dto.User;
using LachoneteApi.Models;

namespace LachoneteApi.Profiles;

public class UsuarioProfile : Profile
{
    public UsuarioProfile()
    {
        CreateMap<CadastroDto, Usuario>();
        CreateMap<EditarPerfilDto, Usuario>();
        CreateMap<Usuario, PerfilDto>();
    }
}
