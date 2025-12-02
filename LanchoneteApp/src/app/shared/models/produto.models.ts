export interface CriarProdutoDto {
  nome: string;
  preco: string;
  descricao: string;
  imagem: File;
  categoriaId: number;
}

export interface EditarProdutoDto {
  nome: string;
  preco: string;
  descricao: string;
  imagem: File;
  categoriaId: number;
}

export interface ProdutoDto {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
  categoriaId: number
}
