import { Component, EventEmitter, inject, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { ProdutoDto } from '../../models/produto.models';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card-inline-produto',
  imports: [CurrencyPipe],
  templateUrl: './card-inline-produto.component.html',
  styleUrl: './card-inline-produto.component.scss'
})
export class CardInlineProdutoComponent {
  produto: InputSignal<ProdutoDto> = input.required<ProdutoDto>();
  editarProduto: OutputEmitterRef<ProdutoDto> = output<ProdutoDto>();
  deletarProduto: OutputEmitterRef<string> = output<string>();

  onEditar() {
    this.editarProduto.emit(this.produto());
  }

  deletar() {
    this.deletarProduto.emit(this.produto().id);
  }

  categoriaMap: Record<number, string> = {
    1: 'Lanches',
    2: 'Sobremesas',
    3: 'Bebidas'
  };



}
