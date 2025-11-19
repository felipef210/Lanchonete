using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LachoneteApi.Models;
using Microsoft.IdentityModel.Tokens;

namespace LachoneteApi.Services.Token;

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GerarToken(Usuario usuario)
    {
        List<Claim> claims = new List<Claim>
        {
            new Claim("id", usuario.Id.ToString()),
            new Claim("nome", usuario.Nome),
            new Claim("role", usuario.TipoUsuario == 0 ? "admin" : "user")
        };

        var chave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["SymmetricSecurityKey"]!));

        var signingCredentials = new SigningCredentials(chave, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken
        (
            expires: DateTime.Now.AddHours(48),
            claims: claims,
            signingCredentials: signingCredentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
