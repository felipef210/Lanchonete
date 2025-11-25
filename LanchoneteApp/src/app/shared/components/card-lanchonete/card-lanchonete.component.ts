import { Component, input, InputSignal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-card-lanchonete',
  imports: [],
  templateUrl: './card-lanchonete.component.html',
  styleUrl: './card-lanchonete.component.scss'
})
export class CardLanchoneteComponent {
  srcImagem: InputSignal<string> = input.required<string>();
  altImagem: InputSignal<string> = input.required<string>();
  titulo: InputSignal<string> = input.required<string>();
  texto: InputSignal<string> = input.required<string>();
}
