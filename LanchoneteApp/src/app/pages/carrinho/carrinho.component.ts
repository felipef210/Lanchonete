import { Component, inject, OnInit } from '@angular/core';
import { PaginaSemFooterComponent } from "../../layout/pagina-sem-footer/pagina-sem-footer.component";
import { CarrinhoService } from '../../core/services/carrinho.service';
import { ItemPedidoDto } from '../../shared/models/pedido.models';
import { CardCarrinhoProdutoComponent } from "../../shared/components/card-carrinho-produto/card-carrinho-produto.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResumoPedidoComponent } from "../../shared/components/resumo-pedido/resumo-pedido.component";
import { PedidoService } from '../../core/services/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  imports: [PaginaSemFooterComponent, CardCarrinhoProdutoComponent, ResumoPedidoComponent],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.scss'
})
export class CarrinhoComponent implements OnInit {
  itens: ItemPedidoDto[] = [];
  primeiraCompra: boolean = false;

  private readonly carrinhoService: CarrinhoService = inject(CarrinhoService);
  private readonly pedidoService: PedidoService = inject(PedidoService);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly router: Router = inject(Router);

  ngOnInit() {
    this.itens = this.carrinhoService.getItens();

    this.pedidoService.getPedidosPorUsuario().subscribe(pedidos => {
      this.primeiraCompra = pedidos.length === 0;
    });
  }

  aumentar(id: string) {
    this.carrinhoService.aumentarQuantidade(id);
    this.itens = this.carrinhoService.getItens();
  }

  diminuir(id: string) {
    this.carrinhoService.diminuirQuantidade(id);
    this.itens = this.carrinhoService.getItens();
  }

  deletar(id: string) {
    this.carrinhoService.removerItem(id);
    this.itens = this.carrinhoService.getItens();
    this.snackBar.open('Item removido do carrinho!', '', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'end'
    });
  }

  finalizarPedido() {
    const itens = this.itens.map(item => ({
      produtoId: item.produtoId!,
      quantidade: item.quantidade
    }));

    this.pedidoService.criarPedido({ itens }).subscribe({
      next: () => {
        this.carrinhoService.limparCarrinho();
        this.router.navigate(['/cardapio']);
        this.snackBar.open('Pedido finalizado!', '', {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'end'
        });
      },
      error: err => {
        this.snackBar.open(`${err.error.detail}`, '', {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'end'
        });
      }
    });
  }
}
