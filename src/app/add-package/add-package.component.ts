import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Driver } from '../models/driver';
import { Package } from '../models/package';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css',
})
export class AddPackageComponent {
  package: Package = new Package('', 0, '', '', false);
  drivers: Driver[] = [];

  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.fetchDrivers();
  }

  fetchDrivers() {
    this.db.getAllDrivers().subscribe((data: any) => {
      this.drivers = data.filter(
        (drivers: { driver_isActive: boolean }) =>
          drivers.driver_isActive === true
      );
    });
  }

  addPackage() {
    // Use the service to submit the driver data
    this.db.createPackage(this.package).subscribe({
      next: () => {
        // On success, navigate to the list drivers page
        this.router.navigate(['list-packages']);
      },
      error: () => {
        // If the backend returns an error, navigate to invalid-data page
        this.router.navigate(['invalid-data']);
      },
    });
  }
}
