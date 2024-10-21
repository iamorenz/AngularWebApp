import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(loginForm: any) {
    console.log('onLogin triggered');

    // Ensure form validation before proceeding
    if (loginForm.invalid) {
      loginForm.control.markAllAsTouched();
      return;
    }

    // Send login request to the backend
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        // Use the token from the backend response
        if (response && response.token) {
          localStorage.setItem('token', response.token);

          // Wrap the navigation in a setTimeout to ensure Angular properly processes state changes
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 0);
        } else {
          console.error('Login response did not include a token.');
          alert('Unexpected response. Please contact support.');
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Login failed. Please check your username and password.');
      },
    });
  }
}
