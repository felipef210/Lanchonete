import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { FormProdutoComponent } from "../../shared/components/form-produto/form-produto.component";
import { ProdutosService } from '../../core/services/produtos.service';
import { CriarProdutoDto, EditarProdutoDto, ProdutoDto } from '../../shared/models/produto.models';
import { CardInlineProdutoComponent } from "../../shared/components/card-inline-produto/card-inline-produto.component";
import { PedidoService } from '../../core/services/pedido.service';
import { PedidoDto } from '../../shared/models/pedido.models';
import { CurrencyPipe, KeyValuePipe, NgClass, AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-painel-administrativo',
  imports: [HeaderComponent, FormProdutoComponent, CardInlineProdutoComponent, CurrencyPipe, KeyValuePipe, NgClass, AsyncPipe],
  templateUrl: './painel-administrativo.component.html',
  styleUrl: './painel-administrativo.component.scss'
})
export class PainelAdministrativoComponent implements OnInit {
  botaoSelecionado: 'produtos' | 'pedidos' = 'produtos';
  produtoSelecionado!: ProdutoDto;

  private produtosSubject = new BehaviorSubject<ProdutoDto[]>([]);
  private pedidosSubject = new BehaviorSubject<PedidoDto[]>([]);

  pedido$ = this.pedidosSubject.asObservable();
  produto$ = this.produtosSubject.asObservable();

  statusMap: Record<number, string> = {
    0: 'Aberto',
    1: 'Em Preparo',
    2: 'Finalizado'
  };

  private readonly produtosService: ProdutosService = inject(ProdutosService);
  private readonly pedidosService: PedidoService = inject(PedidoService);

  ngOnInit() {
    this.carregarProdutosPedidos();
  }

  selecionarDisplay(botao: 'produtos' | 'pedidos') {
    this.botaoSelecionado = botao;
  }

  classeStatus(status: number) {
    switch (status) {
      case 0: return 'aberto';
      case 1: return 'preparando';
      case 2: return 'pronto';
      case 3: return 'finalizado';
      default: return '';
    }
  }

  formatarData(dataUtc: Date): string {
    const data = new Date(dataUtc);
    return data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  getQuantidadeTotal(pedido: PedidoDto): number {
    return pedido.itens.reduce((total, item) => total + item.quantidade, 0);
  }

  selecionarProduto(produto: ProdutoDto) {
    this.produtoSelecionado = produto;
  }

  adicionarProduto(produto: CriarProdutoDto) {
    this.produtosService.adicionarProduto(produto).subscribe({
      next: () => {
        this.carregarProdutosPedidos();
      },

      error: err => {
        console.error(err.error.detail);
      }
    });
  }

  editarProduto(produto: EditarProdutoDto) {
    this.produtosService.editarProduto(produto, this.produtoSelecionado.id).subscribe({
      next: () => {
        this.carregarProdutosPedidos();
      },

      error: err => {
        console.error(err.error?.detail);
      }
    });
  }

  deletarProduto(id: string) {
    this.produtosService.deletarProduto(id).subscribe({
      next: () => {
        this.carregarProdutosPedidos();
      },

      error: err => {
        console.error(err.error);
      }
    });
  }

  deletarPedido(id: string) {
    this.pedidosService.deletarPedido(id).subscribe({
      next: () => {
        this.carregarProdutosPedidos();
      },

      error: err => {
        console.error(err.error);
      }
    })
  }

  private carregarProdutosPedidos() {
    this.produto$ = this.produtosService.getProdutos();
    this.pedido$ = this.pedidosService.getPedidos();
  }
}
