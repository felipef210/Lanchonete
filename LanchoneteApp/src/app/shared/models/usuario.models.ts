export interface CadastroDto {
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export interface LoginDto {
  email: string;
  senha: string;
}

export interface PerfilDto {
  nome: string;
  telefone: string;
  email: string;
}

export interface EditarPerfilDto {
  nome: string;
  telefone: string;
  email: string;
}

export interface RedefinirSenhaDto {
  senhaAtual: string;
  novaSenha: string;
  confirmarNovaSenha: string;
}
