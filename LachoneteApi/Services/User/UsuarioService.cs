using System.Text.RegularExpressions;
using AutoMapper;
using LachoneteApi.Dto.Order;
using LachoneteApi.Dto.User;
using LachoneteApi.Exceptions;
using LachoneteApi.Models;
using LachoneteApi.Repositories.User;
using LachoneteApi.Services.Token;
using Microsoft.AspNetCore.Mvc;

namespace LachoneteApi.Services.User;

public class UsuarioService : IUsuarioService
{
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ITokenService _tokenService;

    public UsuarioService(IUsuarioRepository usuarioRepository, IMapper mapper, IHttpContextAccessor httpContextAccessor, ITokenService tokenService)
    {
        _usuarioRepository = usuarioRepository;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
        _tokenService = tokenService;
    }

    public async Task Cadastrar([FromBody] CadastroDto cadastroDto)
    {
        var usuarioCadastrado = await _usuarioRepository.ExistingUser(cadastroDto.Email);

        if (usuarioCadastrado is not null)
            throw new ParametroInvalidoException("E-mail já cadastrado! Tente outro endereço");

        ValidarFormulario(cadastroDto.Email, cadastroDto.Nome, cadastroDto.Senha, cadastroDto.Telefone);
    
        var usuario = _mapper.Map<Usuario>(cadastroDto);
        usuario.Nome = CapitalizeFullName(usuario.Nome);
        usuario.Telefone = FormatarTelefone(usuario.Telefone);
        usuario.Senha = BCrypt.Net.BCrypt.HashPassword(cadastroDto.Senha);

        await _usuarioRepository.Cadastrar(usuario);
    }

    public async Task<PerfilDto> GetPerfil()
    {
        var usuarioId = _httpContextAccessor.HttpContext?.User?.FindFirst("id")?.Value;

        if (string.IsNullOrEmpty(usuarioId))
            throw new NaoEncontradoException("Usuário não autenticado.");
        
        Guid usuarioIdConvertido = new Guid(usuarioId);

        var usuarioLogado = await _usuarioRepository.GetUserById(usuarioIdConvertido);
        var perfil = _mapper.Map<PerfilDto>(usuarioLogado);

        return perfil;
    }

    public async Task<string> EditarPerfil([FromBody] EditarPerfilDto editarPerfilDto)
    {
        var usuarioLogado = await RetornarUsuarioLogado();

        ValidarFormulario(email: editarPerfilDto.Email, nome: editarPerfilDto.Nome, senha: null, telefone: editarPerfilDto.Telefone);

        if (editarPerfilDto.Email != usuarioLogado.Email)
        {
            var usuarioComMesmoEmail = await _usuarioRepository.ExistingUser(editarPerfilDto.Email);

            if (usuarioComMesmoEmail is not null)
                throw new ParametroInvalidoException("Esse e-mail já está em uso por outro usuário.");
        }

        usuarioLogado.Nome = CapitalizeFullName(editarPerfilDto.Nome);
        usuarioLogado.Email = editarPerfilDto.Email;
        usuarioLogado.Telefone = FormatarTelefone(editarPerfilDto.Telefone);
        usuarioLogado.Senha = usuarioLogado.Senha;
        
        await _usuarioRepository.EditarPerfil(usuarioLogado);

        var novoToken = _tokenService.GerarToken(usuarioLogado);

        return novoToken;
    }

    public async Task EditarSenha([FromBody] EditarSenhaDto editarSenhaDto)
    {
        var usuarioLogado = await RetornarUsuarioLogado();

        if (string.IsNullOrWhiteSpace(editarSenhaDto.SenhaAtual))
        throw new ParametroInvalidoException("Digite a senha atual!");

        if (string.IsNullOrWhiteSpace(editarSenhaDto.NovaSenha))
            throw new ParametroInvalidoException("Digite a nova senha!");

        if (editarSenhaDto.NovaSenha != editarSenhaDto.ConfirmarNovaSenha)
            throw new ParametroInvalidoException("As senhas devem coincidir!");

        bool senhaAtualConfere = BCrypt.Net.BCrypt.Verify(editarSenhaDto.SenhaAtual, usuarioLogado.Senha);

        if (!senhaAtualConfere)
            throw new ParametroInvalidoException("A senha atual está incorreta!");

        usuarioLogado.Senha = BCrypt.Net.BCrypt.HashPassword(editarSenhaDto.NovaSenha);
        await _usuarioRepository.EditarPerfil(usuarioLogado);
    }

    private async Task<Usuario> RetornarUsuarioLogado()
    {
        var usuarioId = _httpContextAccessor.HttpContext?.User?.FindFirst("id")?.Value;

        if (string.IsNullOrEmpty(usuarioId))
            throw new NaoEncontradoException("Usuário não autenticado.");

        Guid usuarioIdConvertido = new Guid(usuarioId);

        var usuarioLogado = await _usuarioRepository.GetUserById(usuarioIdConvertido);

        if (usuarioLogado == null)
            throw new NaoEncontradoException("Usuário não encontrado.");

        return usuarioLogado;
    }

    private bool ValidarFormulario(string email, string nome, string? senha, string telefone)
    {
        if (nome is null)
            throw new ParametroInvalidoException("O nome do usuário é obrigatório!");

        if (email is null)
            throw new ParametroInvalidoException("O e-mail do usuário é obrigatório");
        
        if (!IsFullName(nome))
            throw new ParametroInvalidoException("Insira seu nome completo!");

        if (!IsEmailValid(email))
            throw new ParametroInvalidoException("E-mail no formato incorreto!");

        if (senha is not null)
        {
            if (!IsPasswordValid(senha))
                throw new ParametroInvalidoException("Senha no padrão incorreto!"); 
        } 

        if (telefone is null)
            throw new ParametroInvalidoException("O número de telefone é obrigatório!");

        if (!IsPhoneNumberValid(telefone))
            throw new ParametroInvalidoException("O número de telefone é inválido!");

        return true;
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
        Regex regex = new Regex(@"^\(?[1-9]{2}\)?\s?(?:[2-5]\d{3}|9\d{4})-?\d{4}$");
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
