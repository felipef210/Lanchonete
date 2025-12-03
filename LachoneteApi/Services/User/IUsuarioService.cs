using LachoneteApi.Dto.Order;
using LachoneteApi.Dto.User;
using Microsoft.AspNetCore.Mvc;

namespace LachoneteApi.Services.User;

public interface IUsuarioService
{
    Task Cadastrar([FromBody] CadastroDto cadastroDto);
    Task<PerfilDto> GetPerfil();
    Task<string> EditarPerfil([FromBody] EditarPerfilDto editarPerfilDto);
    Task EditarSenha([FromBody] EditarSenhaDto editarSenhaDto);
}
