import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Route guard that protects routes requiring family membership
 * Redirects to setup-family page if user is not part of a family
 */
export const familyGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.currentUser();

  // Check if user exists and has a family_id
  if (!user || !user.family_id) {
    // Redirect to family setup page
    router.navigate(['/setup-family']);
    return false;
  }

  return true;
};
