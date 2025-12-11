import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../core/services/pedido.service';
import { PedidoDto } from '../../shared/models/pedido.models';
import { PaginaSemFooterComponent } from "../../layout/pagina-sem-footer/pagina-sem-footer.component";
import { CardInlinePedidoComponent } from "../../shared/components/card-inline-pedido/card-inline-pedido.component";

@Component({
  selector: 'app-detalhes-pedido',
  imports: [PaginaSemFooterComponent, CardInlinePedidoComponent],
  templateUrl: './detalhes-pedido.component.html',
  styleUrl: './detalhes-pedido.component.scss'
})
export class DetalhesPedidoComponent implements OnInit {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly pedidoService: PedidoService = inject(PedidoService);

  id!: string;
  pedido!: PedidoDto;

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;

    this.pedidoService.getPedidoById(this.id).subscribe((pedido) => {
      this.pedido = pedido;
    });
  }
}
