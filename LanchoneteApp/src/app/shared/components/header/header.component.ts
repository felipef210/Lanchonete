import { HeaderStateService } from './../../../core/services/header-state.service';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../core/services/auth.service';
import { CarrinhoService } from '../../../core/services/carrinho.service';
import { PedidoService } from '../../../core/services/pedido.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public readonly authService: AuthService = inject(AuthService);
  public readonly pedidoservice: PedidoService = inject(PedidoService);
  private readonly carrinhoService: CarrinhoService = inject(CarrinhoService);
  private readonly headerState: HeaderStateService = inject(HeaderStateService);
  private readonly router: Router = inject(Router);

  menuAberto: boolean = false;
  itens: number = 0;

   modo: 'home-top' | 'default' = 'default';

  existePedidosEmAberto$ = this.pedidoservice.temPedidosEmAberto$;

  ngOnInit() {
    this.carrinhoService.quantidadeItens$.subscribe((qtd) => this.itens = qtd);
    this.pedidoservice.atualizarPedidosEmAberto();

    this.headerState.estadoHeader$.subscribe(estado => {
      this.modo = estado;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const clickedInsideMenu = target.closest('.dropdown-menu');
    const clickedOnToggle = target.closest('.menu-toggle');

    if (!clickedInsideMenu && !clickedOnToggle) {
      this.menuAberto = false;
    }
  }
}
