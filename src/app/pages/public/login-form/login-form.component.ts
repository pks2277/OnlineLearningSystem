// src/app/pages/login-form/login-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../components/navbar/navbar.component";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent
]
})
export class LoginFormComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';
  returnUrl: string = '/';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
      this.navigateBasedOnRole(this.authService.currentUser.role);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    ).subscribe({
      next: (response) => {
        this.navigateBasedOnRole(response.userDetails.role);
      },
      error: (error) => {
        this.error = error.error?.message || 'Login failed';
        this.loading = false;
      }
    });
  }

  private navigateBasedOnRole(role: string) {
    console.log(role)
    switch(role.toLowerCase()) {
      case 'learner':
        console.log("Navigating to Learner Dashboard");
        // this.router.navigate(['/learner/dashboard']);
        console.log(this.router)
        this.router.navigate(['/learner/dashboard'])
        .then(() => console.log('Navigation complete'))
        .catch(err => console.error('Navigation error:', err));
      
        break;
      case 'instructor':
        this.router.navigate(['/instructor/dashboard']);
        break;
      case 'admin':
        this.router.navigate(['/admin/dashboard']);
        break;
      default:
        this.router.navigate([this.returnUrl]);
    }
  }
}
