
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {
  signupObj: Signup;

  constructor(private http: HttpClient, private router: Router) {
    this.signupObj = new Signup();
  }

  onSignup() {
    // debugger;
    if (this.signupObj.password !== this.signupObj.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!this.signupObj.email.endsWith('@gmail.com')) {
      alert('Invalid Email');
      return;
    }

    let signupData = {
      "username": this.signupObj.username,
      "email": this.signupObj.email,
      "passwordHash": this.signupObj.password,
      "role": this.signupObj.role,
      "isActive":true
    };

    console.log(this.signupObj)
    this.http.post('https://localhost:7032/api/Login/Register', signupData, { observe: 'response' }).subscribe(
      (res: any) => {

        console.log('Response:', res);
        if (res.status === 200) {
          alert('Signup Successful');
          this.router.navigateByUrl('/login');
        } else {
          alert('Signup Failed: ' + res);
        }
      },
      (error) => {
        console.error('Error:', error);
        alert('An error occurred during signup: ' + (error.error?.message || error.message));
      }
    );
    
  }
}

export class Signup {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;

  constructor() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.role = '';
  }
}

