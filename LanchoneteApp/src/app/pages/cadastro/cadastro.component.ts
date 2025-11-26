import { Component, inject } from '@angular/core';
import { FormAuthComponent } from "../../shared/components/form-auth/form-auth.component";
import { CadastroDto } from '../../shared/models/cadastroDto';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

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
  mensagemErro!: string;

  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  cadastrar(usuario: CadastroDto) {
    this.authService.cadastrar(usuario).subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
      },

      error: err => {
        this.mensagemErro = err.error.detail;
      }
    });
  }
}
