import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const isLoggedGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isLoggedIn())
    return true;

  if (authService.isTokenExpired()) {
    authService.logout();
    router.navigate(['/']);
    return false;
  }

  router.navigate(['/']);
  return false;
};
