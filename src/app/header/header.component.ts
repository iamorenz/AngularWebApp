import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  onLogout() {
    this.authService.logout().subscribe({
      next: (rep) => {
        localStorage.removeItem('token'); // Remove local token
        // console.log(rep)
      },
      error: () => {
        alert('Logout failed. Please try again.');
      },
    });
  }

  signup() {
    this.authService.navigateToSignup(); // Navigate to the signup page
  }
}
