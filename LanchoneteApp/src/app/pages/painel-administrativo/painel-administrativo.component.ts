import { Component, inject, OnInit } from '@angular/core';
import { FormProdutoComponent } from "../../shared/components/form-produto/form-produto.component";
import { ProdutosService } from '../../core/services/produtos.service';
import { CriarProdutoDto, EditarProdutoDto, ProdutoDto } from '../../shared/models/produto.models';
import { CardInlineProdutoComponent } from "../../shared/components/card-inline-produto/card-inline-produto.component";
import { PedidoService } from '../../core/services/pedido.service';
import { PedidoDto } from '../../shared/models/pedido.models';
import { CurrencyPipe, KeyValuePipe, NgClass, AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { PaginaSemFooterComponent } from "../../layout/pagina-sem-footer/pagina-sem-footer.component";
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { StatusPedidoEnum } from '../../shared/enums/StatusPedidoEnum';
import { ConfirmacaoComponent } from "../../shared/components/dialogs/confirmacao/confirmacao.component";

@Component({
  selector: 'app-painel-administrativo',
  imports: [FormProdutoComponent, CardInlineProdutoComponent, CurrencyPipe, KeyValuePipe, NgClass, AsyncPipe, PaginaSemFooterComponent, MatSnackBarModule, ConfirmacaoComponent],
  templateUrl: './painel-administrativo.component.html',
  styleUrl: './painel-administrativo.component.scss'
})
export class PainelAdministrativoComponent implements OnInit {
  botaoSelecionado: 'produtos' | 'pedidos' = 'produtos';
  produtoSelecionado?: ProdutoDto;
  produtoSelecionadoParaExclusao?: ProdutoDto;
  pedidoSelecionadoParaExclusao?: PedidoDto;
  mensagemDeErro: string = '';
  pedidosEmAbertoCount: number = 0;
  modalAberto = false;
  modalExcluirPedidoAberto = false;

  paginaAtual: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  ultimoNomePesquisado: string = '';

  private produtosSubject = new BehaviorSubject<ProdutoDto[]>([]);
  private pedidosSubject = new BehaviorSubject<PedidoDto[]>([]);
  private pedidosEmAbertoSubject = new BehaviorSubject<PedidoDto[]>([]);

  pedido$ = this.pedidosSubject.asObservable();
  produto$ = this.produtosSubject.asObservable();
  pedidosEmAberto$ = this.pedidosEmAbertoSubject.asObservable();

  statusMap: Record<number, string> = {
    0: 'Aberto',
    1: 'Em Preparo',
    2: 'Finalizado'
  };

  private readonly produtosService: ProdutosService = inject(ProdutosService);
  private readonly pedidosService: PedidoService = inject(PedidoService);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);

  ngOnInit() {
    this.carregarProdutosPaginados();
    this.carregarPedidos();
    this.pedidosEmAberto$.subscribe(lista => {
      this.pedidosEmAbertoCount = lista.length;
    });
  }

  get paginasArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  selecionarDisplay(botao: 'produtos' | 'pedidos') {
    this.botaoSelecionado = botao;
  }

  classeStatus(status: number) {
    switch (status) {
      case 0: return 'aberto';
      case 1: return 'preparando';
      case 2: return 'finalizado';
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
        this.carregarPedidos();
        this.carregarProdutosPaginados();
        this.snackBar.open('Produto adicionado!', '', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      },

      error: err => {
        this.mensagemDeErro = err.error.detail;
      }
    });
  }

  editarProduto(produto: EditarProdutoDto) {
    if (this.produtoSelecionado) {
      this.produtosService.editarProduto(produto, this.produtoSelecionado.id).subscribe({
        next: () => {
          this.carregarPedidos();
          this.carregarProdutosPaginados();
          this.produtoSelecionado = undefined;
          this.snackBar.open('Produto editado!', '', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
        },

        error: err => {
          this.mensagemDeErro = err.error.detail;
        }
      });
    }
  }

  deletarProduto(id: string) {
    this.produtosService.deletarProduto(id).subscribe({
      next: () => {
        this.carregarPedidos();
        this.carregarProdutosPaginados();
        this.snackBar.open('Produto removido!', '', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      },

      error: err => {
        this.snackBar.open(`${err.error.detail}`, '', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    });
  }

  editarPedido(id: string, status: StatusPedidoEnum) {
    this.pedidosService.editarPedido(id, status).subscribe({
      next: () => {
        this.carregarPedidos();
        this.carregarProdutosPaginados();
        this.snackBar.open('Status atualizado!', '', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      },

      error: err => {
        this.snackBar.open(`${err.error.detail || 'Erro ao editar pedido'}`, '', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    });
  }

  deletarPedido(id: string) {
    this.pedidosService.deletarPedido(id).subscribe({
      next: () => {
        this.carregarPedidos();
        this.carregarProdutosPaginados();
        this.snackBar.open('Pedido removido!', '', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      },

      error: err => {
        this.snackBar.open(`${err.error.detail}`, '', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    })
  }

  abrirModal(produto: ProdutoDto) {
    this.produtoSelecionadoParaExclusao = produto;
    this.modalAberto = true;
  }

  abrirModalPedido(pedido: PedidoDto) {
    this.pedidoSelecionadoParaExclusao = pedido;
    this.modalExcluirPedidoAberto = true;
  }

  resolverModal(confirmado: boolean) {
    this.modalAberto = false;

    if (confirmado && this.produtoSelecionadoParaExclusao)
      this.deletarProduto(this.produtoSelecionadoParaExclusao!.id);

    this.produtoSelecionadoParaExclusao = undefined;
  }

  resolverModalPedido(confirmado: boolean) {
    this.modalExcluirPedidoAberto = false;

    if (confirmado && this.pedidoSelecionadoParaExclusao) {
      this.deletarPedido(this.pedidoSelecionadoParaExclusao.id);
    }

    this.pedidoSelecionadoParaExclusao = undefined;
  }

  filtrarPorNome(event: Event) {
    const nome = (event.target as HTMLInputElement).value;

    this.paginaAtual = 1;
    this.carregarProdutosPaginados(nome);
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregarProdutosPaginados(this.ultimoNomePesquisado);
    }
  }

  proximaPagina() {
    if (this.paginaAtual < this.totalPages) {
      this.paginaAtual++;
      this.carregarProdutosPaginados(this.ultimoNomePesquisado);
    }
  }

  irParaPagina(pagina: number) {
    this.paginaAtual = pagina;
    this.carregarProdutosPaginados(this.ultimoNomePesquisado);
  }

  private carregarPedidos() {
    this.pedido$ = this.pedidosService.getPedidos();
    this.pedidosService.getPedidosEmAberto().subscribe(x => this.pedidosEmAbertoSubject.next(x));
  }

  private carregarProdutosPaginados(nome: string = '') {
    this.ultimoNomePesquisado = nome;

    this.produtosService.filtrarPorNome(nome, this.paginaAtual, this.pageSize)
      .subscribe({
        next: (res) => {
          this.totalPages = res.totalPages;

          if (res.totalPages === 0) {
            this.paginaAtual = 1;
            this.produtosSubject.next([]);
            return;
          }

          if (this.paginaAtual > res.totalPages) {
            this.paginaAtual = res.totalPages;
            this.produtosService.filtrarPorNome(this.ultimoNomePesquisado, this.paginaAtual, this.pageSize)
              .subscribe({
                next: r2 => this.produtosSubject.next(r2.items),
                error: err2 => console.log(err2)
              });
            return;
          }

          this.produtosSubject.next(res.items);
        },
        error: err => console.log(err)
      });
  }
}
