import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { PedidoService } from '../../core/services/pedido.service';
import { PedidoDto } from '../../shared/models/pedido.models';
import { CardInlinePedidoComponent } from "../../shared/components/card-inline-pedido/card-inline-pedido.component";

@Component({
  selector: 'app-meus-pedidos',
  imports: [HeaderComponent, CardInlinePedidoComponent],
  templateUrl: './meus-pedidos.component.html',
  styleUrl: './meus-pedidos.component.scss'
})
export class MeusPedidosComponent implements OnInit {
  private readonly pedidoService: PedidoService = inject(PedidoService);

  pedidos!: PedidoDto[];

  ngOnInit() {
    this.pedidoService.getPedidosPorUsuario().subscribe((pedidos) => {
      this.pedidos = pedidos;
    });
  }
}
