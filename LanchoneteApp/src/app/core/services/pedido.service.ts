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
    return this.http.get<PedidoDto[]>(`${this.url}/listarPorUsuario`);
  }

  getPedidosPorUsuario(): Observable<PedidoDto[]> {
    return this.http.get<PedidoDto[]>(`${this.url}/listarPorUsuario`);
  }

  deletarPedido(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
