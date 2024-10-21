import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Package } from '../models/package';
import { ChangeWeightUnitPipe } from '../pipes/change-weight-unit.pipe';
import { Driver } from '../models/driver';

@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [CommonModule, ChangeWeightUnitPipe],
  templateUrl: './list-packages.component.html',
  styleUrl: './list-packages.component.css',
})
export class ListPackagesComponent {
  packageArray: Package[] = [];
  selectedDriver: Driver | null = null;
  selectedPackageId: string | null = null;

  constructor(private db: DatabaseService) {}

  ngOnInit() {
    this.db.getAllPackages().subscribe((data: any) => {
      this.packageArray = data;
    });
  }

  deletePackage(packageId: string) {
    this.db.deletePackageById(packageId).subscribe(() => {
      this.ngOnInit(); // Refresh the list after deletion
    });
  }

  loadDriver(thePackage: Package): void {
    this.selectedDriver = thePackage.driver_id as unknown as Driver; // Use populated driver data
    this.selectedPackageId = thePackage._id; // Track which package row to display the driver details
  }
}
