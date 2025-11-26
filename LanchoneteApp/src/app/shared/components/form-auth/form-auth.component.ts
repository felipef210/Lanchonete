import { Component, inject, Input, input, InputSignal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { isMatchValidator } from '../../validators/isMatchValidator';

@Component({
  selector: 'app-form-auth',
  imports: [RouterLink, ReactiveFormsModule],
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

  passwordRegex: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*\\-_])[A-Za-z\\d!@#$%^&*\\-_]{8,}$';
  phoneRegex: string = '^\\(?\\d{2}\\)?\\s?\\d{4,5}-?\\d{4}$';

  private readonly formBuilder = inject(FormBuilder);

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
    if (this.form.valid) {
      console.log(this.form.value);
      return;
    }

    console.log('Erro');
  }
}
