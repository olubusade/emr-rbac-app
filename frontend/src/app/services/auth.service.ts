import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login'; // Backend login endpoint
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private roleSubject = new BehaviorSubject<string>('');
  private permissionsSubject = new BehaviorSubject<any>({});

  constructor(private http: HttpClient, private router: Router) { }

  // Login method to authenticate user and fetch permissions from backend
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      catchError(error => {
        console.error('Login error', error);
        throw error;
      })
    );
  }

  // Save the role and permissions from the response
  saveUserData(token: string, role: string, permissions: any): void {
    this.setToken(token)// Save JWT token
    localStorage.setItem('role', role);         // Save role
    localStorage.setItem('permissions', JSON.stringify(permissions));  // Save permissions

    this.tokenSubject.next(token);
    this.roleSubject.next(role);
    this.permissionsSubject.next(permissions);
  }
  setToken(t:string){
    localStorage.setItem('auth_token', t); 
  }
  // Get the user's role from local storage
  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  // Get the user's permissions from local storage
  getPermissions(): any {
    return JSON.parse(localStorage.getItem('permissions') || '{}');
  }

  // Logout the user
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('role');
    localStorage.removeItem('permissions');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}
