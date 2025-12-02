import { Component, inject, input, InputSignal, OnInit, output, OutputEmitterRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { isMatchValidator } from '../../validators/isMatchValidator';
import { CadastroDto, LoginDto } from '../../models/usuario.models';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-form-auth',
  imports: [RouterLink, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './form-auth.component.html',
  styleUrl: './form-auth.component.scss'
})
export class FormAuthComponent implements OnInit {
  tela: InputSignal<'login' | 'cadastro'> = input<'login' | 'cadastro'>('login');
  titulo: InputSignal<string> = input.required<string>();
  legenda: InputSignal<string> = input.required<string>();
  textoRedirecionamento: InputSignal<string> = input.required<string>();
  rota: InputSignal<string> = input.required<string>();
  textoLink: InputSignal<string> = input.required<string>();
  textoBotao: InputSignal<string> = input.required<string>();
  mensagemErro: InputSignal<string> = input.required<string>();

  cadastroSubmit: OutputEmitterRef<CadastroDto> = output<CadastroDto>();
  loginSubmit: OutputEmitterRef<LoginDto> = output<LoginDto>();

  passwordRegex: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*\\-_])[A-Za-z\\d!@#$%^&*\\-_]{8,}$';
  phoneRegex: string = '^\\(?\\d{2}\\)?\\s?\\d{4,5}-?\\d{4}$';

  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  form!: FormGroup;

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: [null],
      telefone: [null, [Validators.pattern(this.phoneRegex)]],
      email: [null, [Validators.required]],
      senha: [null, [Validators.required, Validators.pattern(this.passwordRegex)]],
      confirmarSenha: [null, [Validators.pattern(this.passwordRegex)]]
    });

    if (this.tela() === 'cadastro') {
      this.form.setValidators(isMatchValidator('senha', 'confirmarSenha'));

      this.form.get('nome')?.setValidators(Validators.required);
      this.form.get('nome')?.updateValueAndValidity();

      this.form.get('telefone')?.setValidators(Validators.required);
      this.form.get('telefone')?.updateValueAndValidity();

      this.form.get('confirmarSenha')?.setValidators(Validators.required);
      this.form.get('confirmarSenha')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    const email = this.form.get('email')?.value?.toLowerCase() ?? '';

    if(this.tela() === 'cadastro') {
      const formValue: CadastroDto = {
        ...this.form.value,
        email
      };

      this.cadastroSubmit.emit(formValue);
      return;
    }

    const formValue: LoginDto = {
      email: email,
      senha: this.form.get('senha')?.value
    };

    this.loginSubmit.emit(formValue);
  }
}
