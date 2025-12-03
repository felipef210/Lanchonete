import { Component, inject } from '@angular/core';
import { FormAuthComponent } from "../../shared/components/form-auth/form-auth.component";
import { CadastroDto } from '../../shared/models/usuario.models';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro',
  imports: [FormAuthComponent, MatSnackBarModule],
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
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);

  cadastrar(usuario: CadastroDto) {
    this.authService.cadastrar(usuario).subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
        this.snackBar.open('Cadastro efetuado!', '', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      },

      error: err => {
        this.mensagemErro = err.error.detail;
      }
    });
  }
}
