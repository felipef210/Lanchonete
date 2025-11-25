import { Component, Input, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-card-avaliacao',
  imports: [],
  templateUrl: './card-avaliacao.component.html',
  styleUrl: './card-avaliacao.component.scss'
})
export class CardAvaliacaoComponent {
  numbers = Array.from({ length: 5 }, (_, i) => i);

  avaliacao: InputSignal<string> = input.required<string>();
  cliente: InputSignal<string> = input.required<string>();
}
