import { Component, inject, input, InputSignal, OnChanges, OnInit, output, OutputEmitterRef } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';
import { CriarProdutoDto, EditarProdutoDto, ProdutoDto } from '../../models/produto.models';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-produto',
  imports: [NgxMaskDirective, ReactiveFormsModule],
  templateUrl: './form-produto.component.html',
  styleUrl: './form-produto.component.scss'
})
export class FormProdutoComponent implements OnInit, OnChanges {
  produto: InputSignal<ProdutoDto | undefined> = input<ProdutoDto | undefined>();
  adicionarProduto: OutputEmitterRef<CriarProdutoDto> = output<CriarProdutoDto>();
  editarProduto: OutputEmitterRef<EditarProdutoDto> = output<EditarProdutoDto>();
  imagemSelecionada!: File;

  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  form!: FormGroup;

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      descricao: [null, Validators.required],
      preco: [null, Validators.required],
      imagem: [null],
      categoria: [null, Validators.required]
    });
  }

  ngOnChanges() {
    const produto = this.produto();

    if (produto) {
      this.form.patchValue({
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco.toFixed(2),
        imagem: null,
        categoria: produto.categoriaId
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;

      const dto: CriarProdutoDto = {
        nome: formValue.nome,
        descricao: formValue.descricao,
        preco: formValue.preco,
        categoriaId: formValue.categoria,
        imagem: this.imagemSelecionada
      };

      if (!this.produto()) {
        this.adicionarProduto.emit(dto);
        return;
      }

      this.editarProduto.emit(dto as EditarProdutoDto);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file)
      this.imagemSelecionada = file;
  }
}
