import { Component, inject, OnInit, output, OutputEmitterRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isMatchValidator } from '../../../validators/isMatchValidator';
import { AuthService } from '../../../../core/services/auth.service';
import { RedefinirSenhaDto } from '../../../models/usuario.models';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alterar-senha',
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './alterar-senha.component.html',
  styleUrl: './alterar-senha.component.scss'
})
export class AlterarSenhaComponent implements OnInit {
  fecharModal: OutputEmitterRef<void> = output<void>();
  mensagemDeErro: string = '';
  passwordRegex: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*\\-_])[A-Za-z\\d!@#$%^&*\\-_]{8,}$';
  mostrarSenha: boolean = false;
  mostrarConfirmarSenha: boolean = false;

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly authService: AuthService = inject(AuthService);
  private readonly snackBar: MatSnackBar = inject(MatSnackBar)

  form!: FormGroup;

  ngOnInit() {
    this.form = this.formBuilder.group({
      senhaAtual: [null, Validators.required],
      novaSenha: [null, [Validators.required, Validators.pattern(this.passwordRegex)]],
      confirmarNovaSenha: [null, [Validators.required, Validators.pattern(this.passwordRegex)]]
    }, isMatchValidator('novaSenha', 'confirmarNovaSenha'));
  }

  alterarSenha() {
    if (this.form.valid) {
      const formValue: RedefinirSenhaDto = this.form.value as RedefinirSenhaDto;

      this.authService.alterarSenha(formValue).subscribe({
        next: () => {
          this.form.reset();
          this.fecharModal.emit();
          this.snackBar.open('Senha alterada com sucesso!', '', {
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'end'
          });
        },

        error: err => {
          this.mensagemDeErro = err.error.detail;
        }
      });
    }

  }
}
