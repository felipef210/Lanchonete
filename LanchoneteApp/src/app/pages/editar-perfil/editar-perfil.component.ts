import { Component, HostListener, inject, OnInit } from '@angular/core';
import { PaginaSemFooterComponent } from "../../layout/pagina-sem-footer/pagina-sem-footer.component";
import { FormAuthComponent } from "../../shared/components/form-auth/form-auth.component";
import { AuthService } from '../../core/services/auth.service';
import { EditarPerfilDto, PerfilDto } from '../../shared/models/usuario.models';
import { AlterarSenhaComponent } from "../../shared/components/dialogs/alterar-senha/alterar-senha.component";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  imports: [PaginaSemFooterComponent, FormAuthComponent, AlterarSenhaComponent, MatSnackBarModule],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.scss'
})
export class EditarPerfilComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar);
  private readonly router: Router = inject(Router);

  modalAberto: boolean = false;
  titulo: string = `Olá, ${this.authService.getNome().split(' ')[0]}`;
  legenda: string = 'Atualize seu perfil aqui!';
  textoRedirecionamento: string = 'Não tem uma conta?'
  rota: string = '/cadastro';
  textoLink: string = 'Cadastre-se';
  mensagemErro: string = '';
  perfil!: PerfilDto;

  ngOnInit() {
    this.authService.getPerfil().subscribe((perfilResponse) => {
      this.perfil = perfilResponse;
    })
  }

  editarPerfil(dto: EditarPerfilDto) {
    this.authService.editarPerfil(dto).subscribe({
      next: () => {
        this.snackBar.open('Informações do perfil atualizadas!', '', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });

        this.router.navigate(['/']);
      },

      error: err => {
        this.snackBar.open(`${err.error.detail}`, '', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'end'
        });
      }
    })
  }

  abrirModal() {
    this.modalAberto = true;
    document.body.classList.add('no-scroll');
  }

  fecharModal() {
    this.modalAberto = false;
    document.body.classList.remove('no-scroll');
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.modalAberto) this.fecharModal();
  }
}
