// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: string;
}

interface LoginResponse {
  token: string;
  userDetails: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://wq5w12lw-7032.inc1.devtunnels.ms/api/Auth';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser$: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  register(registerData: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerData);
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap(response => {
          // Store user details and token in local storage
          localStorage.setItem('currentUser', JSON.stringify(response.userDetails));
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(response.userDetails);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  public get currentUser(): any {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUser && !!localStorage.getItem('token');
  }

  hasRole(requiredRoles: string[]): boolean {
    if (!this.currentUser) return false;
    return requiredRoles.includes(this.currentUser.role.toLowerCase());
  }

  getUserRole(): string {
    return this.currentUser?.role || '';
  }
}
