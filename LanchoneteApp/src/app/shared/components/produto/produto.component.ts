import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { CarrinhoService } from '../../../core/services/carrinho.service';
import { ProdutoLocalStorage } from '../../models/produto.models';

registerLocaleData(localePt);

@Component({
  selector: 'app-produto',
  imports: [CurrencyPipe],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss'
})
export class ProdutoComponent {
  imagem: InputSignal<string> = input.required<string>();
  nome: InputSignal<string> = input.required<string>();
  descricao: InputSignal<string> = input.required<string>();
  preco: InputSignal<number> = input.required<number>();
  id: InputSignal<string> = input.required<string>();

  snackBarEmmiter: OutputEmitterRef<void> = output();

  public readonly authService: AuthService = inject(AuthService);
  private readonly carrinhoService: CarrinhoService = inject(CarrinhoService);

  adicionar() {
    const produto: ProdutoLocalStorage = {
      id: this.id(),
      nome: this.nome(),
      preco: this.preco(),
    };

    this.carrinhoService.adicionarItem(produto);
    this.snackBarEmmiter.emit();
  }
}
