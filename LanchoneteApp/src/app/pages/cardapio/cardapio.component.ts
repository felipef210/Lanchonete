import { Component, inject, OnInit } from '@angular/core';
import { ContainerComponent } from "../../layout/container/container.component";
import { ProdutoComponent } from "../../shared/components/produto/produto.component";
import { ProdutosService } from '../../core/services/produtos.service';
import { ProdutoDto } from '../../shared/models/produto.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cardapio',
  imports: [ContainerComponent, ProdutoComponent],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.scss'
})
export class CardapioComponent implements OnInit {
  itens: string[] = ['Todos', 'Lanches', 'Sobremesas', 'Bebidas']
  selectedIndex = 0;
  produtos: ProdutoDto[] = [];

  private readonly produtosService: ProdutosService = inject(ProdutosService);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);

  ngOnInit() {
    this.listarProdutos();
  }

  selecionarItem(index: number) {
    this.selectedIndex = index;
    this.filtrarProdutos(this.selectedIndex);
  }

  listarProdutos() {
    this.produtosService.getProdutos().subscribe((itens) => {
      this.produtos = itens;
    });
  }

  filtrarProdutos(categoria: number) {
    this.produtosService.filtrarProdutos(categoria).subscribe((itensFiltrados) => {
      this.produtos = itensFiltrados;
    });
  }

  exibirSnackBar(produtoNome: string) {
    this.snackBar.open(`${produtoNome} adicionado(a) ao carrinho!`, '', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'end'
    });
  }

}
