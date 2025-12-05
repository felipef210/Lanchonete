import { StatusPedidoEnum } from './../../shared/enums/StatusPedidoEnum';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { PedidoDto } from '../../shared/models/pedido.models';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly url: string = environment.apiUrl + '/Pedido';

  getPedidos(): Observable<PedidoDto[]> {
    return this.http.get<PedidoDto[]>(`${this.url}/listar`);
  }

  getPedidosPorUsuario(): Observable<PedidoDto[]> {
    return this.http.get<PedidoDto[]>(`${this.url}/listarPorUsuario`);
  }

  getPedidosEmAberto(): Observable<PedidoDto[]> {
    return this.http.get<PedidoDto[]>(`${this.url}/pedidosEmAberto`);
  }

  criarPedido(body: { itens: { produtoId: string; quantidade: number }[] }): Observable<PedidoDto> {
    return this.http.post<PedidoDto>(`${this.url}`, body);
  }

  editarPedido(id: string, status: StatusPedidoEnum) {
    return this.http.patch(`${this.url}/${id}`, { status });
  }

  deletarPedido(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
