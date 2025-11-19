using LachoneteApi.Models;

namespace LachoneteApi.Services.Token;

public interface ITokenService
{
    string GerarToken(Usuario usuario);
}
