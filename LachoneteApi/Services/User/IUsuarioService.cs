using LachoneteApi.Dto.Order;
using Microsoft.AspNetCore.Mvc;

namespace LachoneteApi.Services.User;

public interface IUsuarioService
{
    Task Cadastrar([FromBody] CadastroDto cadastroDto);
}
