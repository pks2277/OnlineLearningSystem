// // src/app/guards/auth.guard.ts
// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router, private authService: AuthService) {}

//   canActivate(route: ActivatedRouteSnapshot): boolean {
//     const requiredRoles = route.data['roles'] as Array<string>;

//     if (!this.authService.isAuthenticated()) {
//       this.router.navigate(['/login'], { 
//         queryParams: { returnUrl: route.url.join('/') } 
//       });
//       return false;
//     }

//     if (requiredRoles && !this.authService.hasRole(requiredRoles)) {
//       // Redirect based on user's role
//       const currentUser = this.authService.currentUser;
//       switch(currentUser.role) {
//         case 'learner':
//           this.router.navigate(['/learner/dashboard']);
//           break;
//         case 'instructor':
//           this.router.navigate(['/instructor/dashboard']);
//           break;
//         case 'admin':
//           this.router.navigate(['/admin/dashboard']);
//           break;
//         default:
//           this.router.navigate(['/']);
//       }
//       return false;
//     }

//     return true;
//   }
// }
// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as Array<string>;

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: route.url.join('/') } 
      });
      return false;
    }

    if (requiredRoles && !this.authService.hasRole(requiredRoles)) {
      const currentUser = this.authService.currentUser;
      switch(currentUser.role.toLowerCase()) {
        case 'learner':
          this.router.navigate(['/learner/dashboard']);
          break;
        case 'instructor':
          this.router.navigate(['/instructor/dashboard']);
          break;
        case 'admin':
          this.router.navigate(['/admin/dashboard']);
          break;
        case 'support':
          this.router.navigate(['/support/dashboard']);
          break;
        default:
          this.router.navigate(['/']);
      }
      return false;
    }

    return true;
  }
}
