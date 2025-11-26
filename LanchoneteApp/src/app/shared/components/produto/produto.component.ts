import { CurrencyPipe } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

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
}
