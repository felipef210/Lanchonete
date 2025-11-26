import { Component, inject } from '@angular/core';
import { FormAuthComponent } from "../../shared/components/form-auth/form-auth.component";
import { LoginDto } from '../../shared/models/loginDto';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

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
  mensagemErro: string = '';

  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  logar(usuario: LoginDto) {
    this.authService.login(usuario).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },

      error: err => {
        const parsed = JSON.parse(err.error);
        this.mensagemErro = parsed.detail;
      }
    });
  }
}
