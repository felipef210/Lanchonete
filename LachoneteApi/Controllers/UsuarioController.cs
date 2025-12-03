using LachoneteApi.Dto.Order;
using LachoneteApi.Dto.User;
using LachoneteApi.Services.Auth;
using LachoneteApi.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LachoneteApi.Controllers;

[Route("[controller]")]
[Authorize]
public class UsuarioController : Controller
{
    private readonly IUsuarioService _usuarioService;
    private readonly IAuthService _authService;

    public UsuarioController(IUsuarioService usuarioService, IAuthService authService)
    {
        _usuarioService = usuarioService;
        _authService = authService;
    }

    [AllowAnonymous]
    [HttpPost("cadastro")]
    public async Task<ActionResult> Cadastrar([FromBody] CadastroDto cadastroDto)
    {
        await _usuarioService.Cadastrar(cadastroDto);
        return Ok(new { message = "Cadastro efetuado com sucesso" });
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<string>> Logar([FromBody] LoginDto loginDto)
    {
        string token = await _authService.Login(loginDto);
        return Ok(token);
    }

    [HttpGet("perfil")]
    public async Task<ActionResult<PerfilDto>> Perfil()
    {
        var perfil = await _usuarioService.GetPerfil();
        return Ok(perfil);
    }

    [HttpPut("editar-perfil")]
    public async Task<ActionResult<string>> EditarPerfil([FromBody] EditarPerfilDto editarPerfilDto)
    {
        var token = await _usuarioService.EditarPerfil(editarPerfilDto);
        return Ok(new { message = "Perfil editado com sucesso", token });
    }

    [HttpPatch("alterar-senha")]
    public async Task<ActionResult> EditarSenha([FromBody] EditarSenhaDto editarSenhaDto)
    {
        await _usuarioService.EditarSenha(editarSenhaDto);
        return Ok(new { message = "Senha alterada com sucesso" });
    }
}
