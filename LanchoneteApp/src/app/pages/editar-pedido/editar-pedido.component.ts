import { Component, inject, OnInit } from '@angular/core';
import { PaginaSemFooterComponent } from "../../layout/pagina-sem-footer/pagina-sem-footer.component";
import { CardCarrinhoProdutoComponent } from "../../shared/components/card-carrinho-produto/card-carrinho-produto.component";
import { ResumoPedidoComponent } from "../../shared/components/resumo-pedido/resumo-pedido.component";
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../../core/services/pedido.service';
import { ItemPedidoDto, PedidoDto } from '../../shared/models/pedido.models';
import { MatDialog } from '@angular/material/dialog';
import { SelecionarProdutoComponent } from '../../shared/components/dialogs/selecionar-produto/selecionar-produto.component';

@Component({
  selector: 'app-editar-pedido',
  imports: [PaginaSemFooterComponent, CardCarrinhoProdutoComponent, ResumoPedidoComponent],
  templateUrl: './editar-pedido.component.html',
  styleUrl: './editar-pedido.component.scss'
})
export class EditarPedidoComponent implements OnInit {
  itens: ItemPedidoDto[] = [];
  pedido!: PedidoDto;
  id!: string;

  private readonly route = inject(ActivatedRoute);
  private readonly pedidoService = inject(PedidoService);
  private readonly router = inject(Router);
  private readonly dialog: MatDialog = inject(MatDialog);

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.pedidoService.getPedidoById(this.id).subscribe((pedido) => {
      this.pedido = pedido;
      console.log(this.pedido);

      this.itens = pedido.itens.map(i => ({
        produtoId: i.produtoId,
        produtoNome: i.produtoNome,
        produtoPreco: i.produtoPreco,
        quantidade: i.quantidade
      }));
    });


  }

  aumentar(produtoId: string) {
    const item = this.itens.find(i => i.produtoId === produtoId);
    item!.quantidade++;
  }

  diminuir(produtoId: string) {
    const item = this.itens.find(i => i.produtoId === produtoId);

    if (item!.quantidade > 1) item!.quantidade--;
    else this.itens = this.itens.filter(i => i.produtoId !== produtoId);
  }

  removerItem(produtoId: string) {
    this.itens = this.itens.filter(i => i.produtoId !== produtoId);
  }

  salvarEdicao() {
    const dto = {
    itens: this.itens.map(i => ({
      produtoId: i.produtoId!,
      quantidade: i.quantidade
    }))
  };

    this.pedidoService.editarPedido(this.id, dto).subscribe(() => {
      this.router.navigate(['/administrativo']);
    });
  }

  abrirModalAdicionarItem() {
    const dialogRef = this.dialog.open(SelecionarProdutoComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(produto => {
      if (!produto) return;

      const jaExiste = this.itens.find(i => i.produtoId === produto.id);

      if (jaExiste) {
        jaExiste.quantidade++;
        return;
      }

      // adiciona novo item
      this.itens.push({
        produtoId: produto.id,
        produtoNome: produto.nome,
        produtoPreco: produto.preco,
        quantidade: 1
      });
    });
  }
}
