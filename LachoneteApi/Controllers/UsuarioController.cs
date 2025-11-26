using LachoneteApi.Dto.Order;
using LachoneteApi.Dto.User;
using LachoneteApi.Services.Auth;
using LachoneteApi.Services.User;
using Microsoft.AspNetCore.Mvc;

namespace LachoneteApi.Controllers;

[Route("[controller]")]
public class UsuarioController : Controller
{
    private readonly IUsuarioService _usuarioService;
    private readonly IAuthService _authService;

    public UsuarioController(IUsuarioService usuarioService, IAuthService authService)
    {
        _usuarioService = usuarioService;
        _authService = authService;
    }

    [HttpPost("cadastro")]
    public async Task<ActionResult> Cadastrar([FromBody] CadastroDto cadastroDto)
    {
        await _usuarioService.Cadastrar(cadastroDto);
        return Ok(new { message = "Cadastro efetuado com sucesso" });
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Logar([FromBody] LoginDto loginDto)
    {
        string token = await _authService.Login(loginDto);
        return Ok(token);
    }
}
