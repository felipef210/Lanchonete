import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ProdutoDto } from '../../shared/models/produtoDto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly url: string = environment.apiUrl + '/Produto';

  getProdutos(): Observable<ProdutoDto[]> {
    return this.http.get<ProdutoDto[]>(`${this.url}/listar`);
  }

  filtrarProdutos(categoria: number): Observable<ProdutoDto[]> {
    return this.http.get<ProdutoDto[]>(`${this.url}/filtro`, { params: { categoria } });
  }

}
