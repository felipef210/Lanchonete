import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
