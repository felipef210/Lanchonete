using LachoneteApi.Models;

namespace LachoneteApi.Repositories.User;

public interface IUsuarioRepository
{
    Task Cadastrar(Usuario usuario);
    Task<Usuario> ExistingUser(string email);
}
