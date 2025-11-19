using System.Text.RegularExpressions;
using AutoMapper;
using LachoneteApi.Dto.Order;
using LachoneteApi.Models;
using LachoneteApi.Repositories.User;
using Microsoft.AspNetCore.Mvc;

namespace LachoneteApi.Services.User;

public class UsuarioService : IUsuarioService
{
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly IMapper _mapper;

    public UsuarioService(IUsuarioRepository usuarioRepository, IMapper mapper)
    {
        _usuarioRepository = usuarioRepository;
        _mapper = mapper;
    }

    public async Task Cadastrar([FromBody] CadastroDto cadastroDto)
    {
        var usuarioCadastrado = await _usuarioRepository.ExistingUser(cadastroDto.Email);

        if (usuarioCadastrado is not null)
            throw new Exception("E-mail já cadastrado! Tente outro endereço");

        if (!IsFullName(cadastroDto.Nome))
            throw new Exception("Insira seu nome completo!");

        if (!IsPasswordValid(cadastroDto.Senha))
            throw new Exception("Senha no padrão incorreto!");
    
        var usuario = _mapper.Map<Usuario>(cadastroDto);
        usuario.Nome = CapitalizeFullName(usuario.Nome);
        usuario.Senha = BCrypt.Net.BCrypt.HashPassword(cadastroDto.Senha);

        await _usuarioRepository.Cadastrar(usuario);
    }

    private string CapitalizeFullName(string fullName)
    {
        if (string.IsNullOrWhiteSpace(fullName))
            return fullName;

        string[] lowercaseWords = { "da", "de", "do", "dos", "das" };

        return string.Join(" ", fullName
            .ToLower()
            .Split(' ', StringSplitOptions.RemoveEmptyEntries)
            .Select((word, index) =>
            {
                // Sempre mantém a primeira letra do primeiro nome maiuscula, mesmo sendo uma preposição.
                if (index == 0 || !lowercaseWords.Contains(word))
                    return char.ToUpper(word[0]) + word.Substring(1);
                else
                    return word;
            }));
    }

    private bool IsPasswordValid(string password)
    {
        Regex regex = new Regex(@"^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&_*-])[A-Za-z\d!@#$%^&_*-]{8,}$");
        return regex.IsMatch(password);
    }

    private bool IsFullName(string fullName)
    {
        if (string.IsNullOrWhiteSpace(fullName))
            return false;

        Regex nomeRegex = new Regex(@"^[A-Za-zÀ-ÖØ-öø-ÿ' ]+$");

        if (!nomeRegex.IsMatch(fullName))
            return false;

        string[] separatedName = fullName.Split(' ', StringSplitOptions.RemoveEmptyEntries);

        return separatedName.Length > 1;
    }

}
