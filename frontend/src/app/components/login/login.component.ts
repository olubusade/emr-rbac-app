import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // Import your auth service

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return; // Return if form is invalid
    }

    // Get form values
    const { username, password } = this.loginForm.value;

    // Call the AuthService to authenticate the user
    this.authService.login(username, password).subscribe(
      (response) => {
        // If authentication is successful, get the user's role and navigate to the appropriate dashboard
        const userRole = response.role;  // assuming response contains a user role
        this.authService.setToken(response.token);  // Store the JWT token
        this.errorMessage = null;

        // Navigate based on role
        switch (userRole) {
          case 'admin':
            this.router.navigate(['/admin-dashboard']);
            break;
          case 'doctor':
            this.router.navigate(['/doctor-dashboard']);
            break;
          case 'nurse':
            this.router.navigate(['/nurse-dashboard']);
            break;
          case 'frontdesk':
            this.router.navigate(['/frontdesk-dashboard']);
            break;
          default:
            this.router.navigate(['/login']);
            break;
        }
      },
      (error:any) => {
        // Handle login error (incorrect username/password)
        this.errorMessage = 'Invalid username or password';
        console.error('Login error:', error);
      }
    );
  }
}
