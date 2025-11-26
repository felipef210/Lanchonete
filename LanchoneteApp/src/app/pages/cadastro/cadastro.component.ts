import { Component } from '@angular/core';
import { FormAuthComponent } from "../../shared/components/form-auth/form-auth.component";

@Component({
  selector: 'app-cadastro',
  imports: [FormAuthComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  titulo: string = 'Criar Conta';
  legenda: string = 'Cadastre-se para começar a fazer pedidos';
  textoRedirecionamento: string = 'Já tem uma conta?'
  rota: string = '/login';
  textoLink: string = 'Faça login';
}
