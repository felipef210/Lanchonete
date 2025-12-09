import { StatusPedidoEnum } from './../../shared/enums/StatusPedidoEnum';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { PedidoDto } from '../../shared/models/pedido.models';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly url: string = environment.apiUrl + '/Pedido';

  private temPedidosEmAbertoSubject = new BehaviorSubject<boolean>(false);
  temPedidosEmAberto$ = this.temPedidosEmAbertoSubject.asObservable();

  getPedidos(): Observable<PedidoDto[]> {
    return this.http.get<PedidoDto[]>(`${this.url}/listar`);
  }

  getPedidosPorUsuario(): Observable<PedidoDto[]> {
    return this.http.get<PedidoDto[]>(`${this.url}/listarPorUsuario`);
  }

  getPedidosEmAberto(): Observable<PedidoDto[]> {
    return this.http.get<PedidoDto[]>(`${this.url}/pedidosEmAberto`);
  }

  atualizarPedidosEmAberto() {
    this.getPedidosEmAberto().subscribe(pedidos => {
      this.temPedidosEmAbertoSubject.next(pedidos.length > 0);
    });
  }

  criarPedido(body: { itens: { produtoId: string; quantidade: number }[] }): Observable<PedidoDto> {
    return this.http.post<PedidoDto>(`${this.url}`, body).pipe(
      tap(() => this.atualizarPedidosEmAberto())
    );
  }

  editarPedido(id: string, status: StatusPedidoEnum) {
    return this.http.patch(`${this.url}/${id}`, { status }).pipe(
      tap(() => this.atualizarPedidosEmAberto())
    );
  }

  deletarPedido(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      tap(() => this.atualizarPedidosEmAberto())
    );
  }
}
