using LachoneteApi.Dto.User;
using Microsoft.AspNetCore.Mvc;

namespace LachoneteApi.Services.Auth;

public interface IAuthService
{
    Task<string> Login([FromBody] LoginDto loginDto);
}
