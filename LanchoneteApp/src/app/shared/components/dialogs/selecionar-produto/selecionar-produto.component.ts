import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProdutoDto } from '../../../models/produto.models';
import { ProdutosService } from '../../../../core/services/produtos.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-selecionar-produto',
  imports: [CurrencyPipe],
  templateUrl: './selecionar-produto.component.html',
  styleUrl: './selecionar-produto.component.scss'
})
export class SelecionarProdutoComponent {
  produtos: ProdutoDto[] = [];

  private readonly dialogRef = inject(MatDialogRef<SelecionarProdutoComponent>);
  private readonly produtosService: ProdutosService = inject(ProdutosService);

  ngOnInit(): void {
    this.produtosService.getProdutos().subscribe((produtos) => {
      this.produtos = produtos;
    });
  }

  selecionar(produto: ProdutoDto) {
    this.dialogRef.close(produto);
  }

  fechar() {
    this.dialogRef.close();
  }
}
