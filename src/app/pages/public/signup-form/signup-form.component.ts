// src/app/pages/signup-form/signup-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../components/navbar/navbar.component";

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent
]
})
export class SignupFormComponent {
  signupForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      name:['',[Validators.required,Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['Learner', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    // Remove confirmPassword before sending to API
    const { confirmPassword, ...registrationData } = this.signupForm.value;

    this.authService.register(registrationData).subscribe({
      next: () => {
        this.router.navigate(['/login'], { 
          queryParams: { registered: 'true' }
        });
      },
      error: (error) => {
        this.error = error.error?.message || 'Registration failed';
        this.loading = false;
      }
    });
  }

  // Helper methods for template
  get f() { return this.signupForm.controls; }
  
  hasError(controlName: string, errorName: string): boolean {
    const control = this.signupForm.get(controlName);
    return control?.touched && control?.hasError(errorName) || false;
  }
}
