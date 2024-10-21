import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css',
})
export class AddDriverComponent {
  driver: Driver = new Driver('', '', '', false);

  constructor(private db: DatabaseService, private router: Router) {}

  addDriver() {
    // Use the service to submit the driver data
    this.db.createDriver(this.driver).subscribe({
      next: () => {
        // On success, navigate to the list drivers page
        this.router.navigate(['list-drivers']);
      },
      error: () => {
        // If the backend returns an error, navigate to invalid-data page
        this.router.navigate(['invalid-data']);
      },
    });
  }
}
