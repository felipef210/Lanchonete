using LachoneteApi.Dto.User;
using LachoneteApi.Repositories.User;
using LachoneteApi.Services.Token;
using Microsoft.AspNetCore.Mvc;

namespace LachoneteApi.Services.Auth;

public class AuthService : IAuthService
{
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly ITokenService _tokenService;

    public AuthService(IUsuarioRepository usuarioRepository, ITokenService tokenService)
    {
        _usuarioRepository = usuarioRepository;
        _tokenService = tokenService;
    }

    public async Task<string> Login([FromBody] LoginDto loginDto)
    {
        var usuario = await _usuarioRepository.ExistingUser(loginDto.Email) ?? throw new UnauthorizedAccessException("E-mail ou senha inválido!");
        var senha = loginDto.Senha.Trim();

        if (!BCrypt.Net.BCrypt.Verify(senha, usuario.Senha))
            throw new UnauthorizedAccessException("E-mail ou senha inválido!");

        return _tokenService.GerarToken(usuario);
    }
}
