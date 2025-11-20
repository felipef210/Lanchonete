using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LachoneteApi.Data;
using LachoneteApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LachoneteApi.Repositories.User;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly Context _context;

    public UsuarioRepository(Context context)
    {
        _context = context;
    }

    public async Task Cadastrar(Usuario usuario)
    {
        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();
    }

    public async Task<Usuario> ExistingUser(string email)
    {
        return await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<Usuario> GetUserById(Guid userId)
    {
        return await _context.Usuarios.FirstOrDefaultAsync(u => u.Id == userId);
    }
}
