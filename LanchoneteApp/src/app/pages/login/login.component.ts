import { Component } from '@angular/core';
import { FormAuthComponent } from "../../shared/components/form-auth/form-auth.component";

@Component({
  selector: 'app-login',
  imports: [FormAuthComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  titulo: string = 'Bem-vindo de volta';
  legenda: string = 'Entre com suas credenciais para continuar';
  textoRedirecionamento: string = 'Não tem uma conta?'
  rota: string = '/cadastro';
  textoLink: string = 'Cadastre-se';
}
