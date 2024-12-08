import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learner-dashboard',
  standalone: true,
  imports: [FooterComponent,NavbarComponent],
  templateUrl: './learner-dashboard.component.html',
  styleUrl: './learner-dashboard.component.scss'
})
// Define the expected structure of the user object

// Use this interface in your component
export class LearnerDashboardComponent {
  user: User | null = null;
  
  constructor(private router: Router) {
    // Safely access the state passed from the router
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['user']) {
      this.user = state['user'] as User;  // Typecast to the User interface
    }
    
    console.log('User Details:', this.user); // Display user details in console
  }
}


interface User {
  username: string;
  email: string;
  role: string;
  token: string;
  // Define other properties except password and isActive
}