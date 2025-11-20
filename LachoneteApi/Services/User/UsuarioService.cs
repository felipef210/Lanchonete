using System.Text.RegularExpressions;
using AutoMapper;
using LachoneteApi.Dto.Order;
using LachoneteApi.Exceptions;
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
            throw new ParametroInvalidoException("E-mail já cadastrado! Tente outro endereço");

        if (cadastroDto.Nome is null)
            throw new ParametroInvalidoException("O nome do usuário é obrigatório!");

        if (cadastroDto.Email is null)
            throw new ParametroInvalidoException("O e-mail do usuário é obrigatório");
        
        if (!IsFullName(cadastroDto.Nome))
            throw new ParametroInvalidoException("Insira seu nome completo!");

        if (!IsEmailValid(cadastroDto.Email))
            throw new ParametroInvalidoException("E-mail no formato incorreto!");
        
        if (!IsPasswordValid(cadastroDto.Senha))
            throw new ParametroInvalidoException("Senha no padrão incorreto!");

        if (cadastroDto.Telefone is null)
            throw new ParametroInvalidoException("O número de telefone é obrigatório!");

        if (IsPhoneNumberValid(cadastroDto.Telefone))
            throw new ParametroInvalidoException("O número de telefone é inválido!");
    
        var usuario = _mapper.Map<Usuario>(cadastroDto);
        usuario.Nome = CapitalizeFullName(usuario.Nome);
        usuario.Telefone = FormatarTelefone(usuario.Telefone);
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

    private bool IsEmailValid(string email)
    {
        Regex regex = new Regex(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$");
        return regex.IsMatch(email);
    }

    private bool IsPasswordValid(string password)
    {
        Regex regex = new Regex(@"^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&_*-])[A-Za-z\d!@#$%^&_*-]{8,}$");
        return regex.IsMatch(password);
    }

    private bool IsPhoneNumberValid(string phoneNumber)
    {
        Regex regex = new Regex(@"^\(?[1-9]{2}\)?\s?[6-9]\d{4}-?\d{4}$");
        return regex.IsMatch(phoneNumber);
    }

    private static string FormatarTelefone(string telefone)
    {
        telefone = new string(telefone.Where(char.IsDigit).ToArray());

        if (telefone.Length == 11)
            return Regex.Replace(telefone, @"(\d{2})(\d{5})(\d{4})", "($1) $2-$3");

        if (telefone.Length == 10)
            return Regex.Replace(telefone, @"(\d{2})(\d{4})(\d{4})", "($1) $2-$3");

        return telefone;
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
