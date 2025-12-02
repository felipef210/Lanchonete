import { Component, HostListener, inject } from '@angular/core';
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

  menuAberto: boolean = false;

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
