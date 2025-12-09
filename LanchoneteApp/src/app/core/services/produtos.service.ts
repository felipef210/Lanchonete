import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CriarProdutoDto, EditarProdutoDto, ProdutoDto } from '../../shared/models/produto.models';
import { PaginacaoDto } from '../../shared/models/paginacao.models';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly url: string = environment.apiUrl + '/Produto';

  getProdutos(): Observable<ProdutoDto[]> {
    return this.http.get<ProdutoDto[]>(`${this.url}/listar`);
  }

  getProdutoById(id: string): Observable<ProdutoDto> {
    return this.http.get<ProdutoDto>(`${this.url}/${id}`);
  }

  filtrarProdutos(categoria: number): Observable<ProdutoDto[]> {
    return this.http.get<ProdutoDto[]>(`${this.url}/filtro`, { params: { categoria } });
  }

  filtrarPorNome(nome: string, page: number, pageSize: number): Observable<PaginacaoDto<ProdutoDto>> {
    return this.http.get<PaginacaoDto<ProdutoDto>>(`${this.url}/filtroPorNome`, {
      params: { nome, page, pageSize }
    });
  }

  adicionarProduto(produto: CriarProdutoDto): Observable<ProdutoDto> {
    const formData = this.buildFormData(produto);
    return this.http.post<ProdutoDto>(this.url, formData);
  }

  editarProduto(produto: EditarProdutoDto, id: string): Observable<ProdutoDto> {
    const formData = this.buildFormData(produto);
    return this.http.put<ProdutoDto>(`${this.url}/${id}`, formData);
  }

  deletarProduto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  private buildFormData(produto: CriarProdutoDto): FormData {
    const formData = new FormData();

    formData.append('nome', produto.nome);
    formData.append('descricao', produto.descricao);
    formData.append('preco', produto.preco.toString().replace('.', ','));
    formData.append('categoriaId', produto.categoriaId.toString());

    if (produto.imagem instanceof File)
      formData.append("imagem", produto.imagem, produto.imagem.name);


    else if (typeof produto.imagem === "string")
      formData.append("imagemUrl", produto.imagem);

    return formData;
  }
}
