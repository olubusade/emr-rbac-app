import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = 'http://localhost:3000';
    private jwtHelper = new JwtHelperService();
    private permissions: any = {};
    constructor(private http: HttpClient,private router: Router) {}

    getPermissions(): any {
      return this.permissions;
    }
  
    hasPermission(resource: string, action: string): boolean {
      return this.permissions[resource]?.[action] || false;
    }
  
    login(username: string, password: string) {
        return this.http.post(`${this.apiUrl}/login`, { username, password });
    }

    logout() {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  
    getDecodedToken() {
        const token:any = localStorage.getItem('token');
        return this.jwtHelper.decodeToken(token);
    }

    isLoggedIn(): boolean {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }
}
