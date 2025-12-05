import { Component, inject } from '@angular/core';
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
export class HomeComponent {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  redirecionar() {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/cardapio']);
      return;
    }

    this.router.navigate(['/login']);
  }
}
