import { HeaderStateService } from './../../core/services/header-state.service';
import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ContainerComponent } from "../../layout/container/container.component";
import { CardLanchoneteComponent } from "../../shared/components/card-lanchonete/card-lanchonete.component";
import { CardAvaliacaoComponent } from "../../shared/components/card-avaliacao/card-avaliacao.component";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [ContainerComponent, CardLanchoneteComponent, CardAvaliacaoComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly headerState: HeaderStateService = inject(HeaderStateService);

  @ViewChild('secao1') secao1!: ElementRef;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.headerState.setEstado('home-top');
        } else {
          this.headerState.setEstado('default');
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(this.secao1.nativeElement);
  }

  redirecionar() {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/cardapio']);
      return;
    }

    this.router.navigate(['/login']);
  }
}
