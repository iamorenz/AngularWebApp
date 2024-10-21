import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Driver } from '../models/driver';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-driver.component.html',
  styleUrl: './update-driver.component.css',
})
export class UpdateDriverComponent {
  driver: Driver = new Driver('', '', '', false);

  constructor(private db: DatabaseService, private router: Router) {}

  updateDriver() {
    this.db.updateDriverById(this.driver).subscribe({
      next: () => {
        this.router.navigate(['list-drivers']);
      },
      error: () => {
        this.router.navigate(['invalid-data']);
      },
    });
  }
}
