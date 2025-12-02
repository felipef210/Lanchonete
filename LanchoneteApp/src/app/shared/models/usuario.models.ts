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
