import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginObj: Login;

  constructor(private http: HttpClient, private router: Router) {
    this.loginObj = new Login();
  }

  onLogin() {
    // Create login data object
    let loginData = {
      "username": this.loginObj.username,
      "passwordHash": this.loginObj.password
    };
  
    // Send the login request
    this.http.post('https://localhost:7032/api/Login/Login', loginData, { observe: 'response' }).subscribe(
      (res: any) => {
        console.log('Response:', res);
        if (res.status === 200 && res.body.token) {
          // Assuming the token contains a role field, parse the token to check the role
          const token = res.body.token;
          const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
  
          // Store user details for dashboard display
          const userDetails = res.body.userDetails;
          
          // Check the role of the user
          if (decodedToken.role === 'learner') {
            alert("Login Success - Learner");
            this.router.navigate(['/learner-dashboard'], { state: { user: userDetails } }); // Passing userDetails to dashboard
          } else if (decodedToken.role === 'admin') {
            alert("Login Success - Admin");
            this.router.navigate(['/admin-dashboard'], { state: { user: userDetails } }); // Passing userDetails to dashboard
          }else if (decodedToken.role === 'instructor') {
            alert("Login Success - Instructor");
            this.router.navigate(['/instructor-dashboard'], { state: { user: userDetails } }); // Passing userDetails to dashboard
          }
           else {
            alert("Login Success - Unknown role");
          }
        } else {
          alert("Invalid Credentials");
        }
      },
      (error) => {
        console.error('Error during login:', error);
        alert('An error occurred during login: ' + (error.error?.message || error.message));
      }
    );
  }  
}

// Login object model
export class Login {
  username: string;
  password: string;
  constructor() {
    this.username = '';
    this.password = '';
  }
}
