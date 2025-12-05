import { inject, Injectable } from '@angular/core';
import { ItemPedidoDto } from '../../shared/models/pedido.models';
import { AuthService } from './auth.service';
import { ProdutoLocalStorage } from '../../shared/models/produto.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private readonly authService: AuthService = inject(AuthService);

  private quantidadeItensSubject = new BehaviorSubject<number>(0);
  quantidadeItens$ = this.quantidadeItensSubject.asObservable();

  constructor() {
    this.atualizarQuantidadeItens();
  }

  private getCarrinhoKey(): string {
    const userId = this.authService.getJWTClaim('id');
    return `carrinho_${userId}`;
  }

  private atualizarQuantidadeItens() {
    this.quantidadeItensSubject.next(this.getItens().length);
  }

  getItens(): ItemPedidoDto[] {
    const key = this.getCarrinhoKey();
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : [];
  }

  private salvarItens(itens: ItemPedidoDto[]) {
    const key = this.getCarrinhoKey();
    localStorage.setItem(key, JSON.stringify(itens));

    this.atualizarQuantidadeItens();
  }

  adicionarItem(produto: ProdutoLocalStorage) {
    const itens = this.getItens();

    const itemEncontrado = itens.find(i => i.produtoId === produto.id);

    if(itemEncontrado)
      itemEncontrado.quantidade += 1;

    else {
      itens.push({
        produtoId: produto.id,
        produtoNome: produto.nome,
        produtoPreco: produto.preco,
        quantidade: 1
      });
    }

    this.salvarItens(itens);
  }

  removerItem(produtoId: string) {
    const itens = this.getItens().filter(i => i.produtoId !== produtoId);
    this.salvarItens(itens);
  }

  aumentarQuantidade(produtoId: string) {
    const itens = this.getItens();

    const item = itens.find(i => i.produtoId === produtoId);

    if(item) {
      item.quantidade += 1;
      this.salvarItens(itens);
    }
  }

  diminuirQuantidade(produtoId: string) {
    const itens = this.getItens();

    const item = itens.find(i => i.produtoId === produtoId);

    if(!item)
      return;

    if(item.quantidade > 1)
      item.quantidade -= 1;

    else {
      const idx = itens.indexOf(item);
      itens.splice(idx, 1);
    }

    this.salvarItens(itens);
  }

  limparCarrinho() {
    const key = this.getCarrinhoKey();
    localStorage.removeItem(key);
    this.atualizarQuantidadeItens();
  }

  getTotal(): number {
    return this.getItens()
      .reduce((acc, item) => acc + item.produtoPreco * item.quantidade, 0);
  }
}
