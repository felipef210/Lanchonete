import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { ItemPedidoDto } from '../../models/pedido.models';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-resumo-pedido',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './resumo-pedido.component.html',
  styleUrl: './resumo-pedido.component.scss'
})
export class ResumoPedidoComponent {
  primeiraCompra: InputSignal<boolean> = input<boolean>(false);
  itens: InputSignal<ItemPedidoDto[]> = input.required<ItemPedidoDto[]>();
  editarPedido: InputSignal<boolean> = input<boolean>(false);
  finalizarPedidoEmmiter: OutputEmitterRef<void> = output();

  get total(): number {
    return this.itens().reduce((acc, item) => acc + (item.produtoPreco! * item.quantidade), 0);
  }

  get totalComDesconto(): number {
    const total = this.total;
    return this.primeiraCompra() ? total * 0.9 : total;
  }
}
