import { Component, inject, input, InputSignal, OnInit, output, OutputEmitterRef } from '@angular/core';
import { ProdutosService } from '../../../core/services/produtos.service';
import { ProdutoDto } from '../../models/produto.models';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card-carrinho-produto',
  imports: [CurrencyPipe],
  templateUrl: './card-carrinho-produto.component.html',
  styleUrl: './card-carrinho-produto.component.scss'
})
export class CardCarrinhoProdutoComponent implements OnInit {
  private readonly produtosService: ProdutosService = inject(ProdutosService);

  produtoId: InputSignal<string> = input.required<string>();
  quantidade: InputSignal<number> = input.required<number>();

  aumentarQuantidade: OutputEmitterRef<void> = output();
  diminuirQuantidade: OutputEmitterRef<void> = output();
  deletarItem: OutputEmitterRef<void> = output();

  produto: ProdutoDto | null = null;

  ngOnInit() {
    this.produtosService.getProdutoById(this.produtoId()).subscribe((produtoResponse) => {
      this.produto = produtoResponse;
    });
  }
}
