// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.getCurrentUser();

    if (!user) {
      // If user is not authenticated, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }

    // Get expected roles from route data
    const expectedRoles = route.data['roles'] as Array<string>;
    if (expectedRoles && !expectedRoles.includes(user.role)) {
      // If user doesn't have required role, redirect
      alert('Access Denied: Insufficient permissions');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
