import { Component, inject, input, InputSignal, Pipe } from '@angular/core';
import { PedidoDto } from '../../models/pedido.models';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { StatusPedidoEnum } from '../../enums/StatusPedidoEnum';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-card-inline-pedido',
  imports: [NgClass, DatePipe, DecimalPipe],
  templateUrl: './card-inline-pedido.component.html',
  styleUrl: './card-inline-pedido.component.scss'
})
export class CardInlinePedidoComponent {
  pedido: InputSignal<PedidoDto> = input.required<PedidoDto>();
  StatusPedidoEnum = StatusPedidoEnum;

  public readonly authService: AuthService = inject(AuthService);

  statusMap: Record<number, string> = {
    0: 'Aberto',
    1: 'Em Preparo',
    2: 'Finalizado'
  };
}
