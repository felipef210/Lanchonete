import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'app-confirmacao',
  imports: [],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.scss'
})
export class ConfirmacaoComponent {
  itemName: InputSignal<string> = input.required<string>();
  result: OutputEmitterRef<boolean> = output<boolean>();

  close() {
    this.result.emit(false);
  }

  confirm() {
    this.result.emit(true);
  }
}
