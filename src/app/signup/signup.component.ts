import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class SignupComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup(signupForm: any) {

    // Validate the form before making a request
    if (signupForm.invalid) {
      signupForm.control.markAllAsTouched();
      return;
    }

    this.authService.signup(this.username, this.password).subscribe({
      next: () => {
        alert('Signup successful!');
        this.router.navigate(['login']);
      },
      error: () => {
        alert('Signup failed. Please try again.');
      },
    });
  }

  navigateToLogin() {
    this.authService.navigateToLogin();
  }
}
