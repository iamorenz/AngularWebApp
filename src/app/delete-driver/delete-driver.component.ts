import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Driver } from '../models/driver';

@Component({
  selector: 'app-delete-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-driver.component.html',
  styleUrl: './delete-driver.component.css',
})
export class DeleteDriverComponent {
  driver: Driver = new Driver('', '', '', false);

  constructor(private db: DatabaseService, private router: Router) {}

  deleteDriver() {
    this.db.deleteDriverById(this.driver._id).subscribe({
      next: () => {
        this.router.navigate(['list-drivers']);
      },
      error: () => {
        this.router.navigate(['invalid-data']);
      },
    });
  }
}
