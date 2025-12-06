using LachoneteApi.Models;

namespace LachoneteApi.Repositories.User;

public interface IUsuarioRepository
{
    Task Cadastrar(Usuario usuario);
    Task EditarPerfil(Usuario usuario);
    Task<Usuario> ExistingUser(string email);
    Task<Usuario> ObterUsuarioComPedidos(Guid usuarioId);
    Task<Usuario> GetUserById(Guid userId);
}
