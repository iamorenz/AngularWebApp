import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../services/database.service';
import { UppercasePipe } from '../pipes/uppercase.pipe';
import { Package } from '../models/package';

@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [CommonModule, UppercasePipe],
  templateUrl: './list-drivers.component.html',
  styleUrl: './list-drivers.component.css',
})
export class ListDriversComponent {
  driversArray: Driver[] = [];
  packagesArray: Package[] = [];
  selectedDriverId: string | null = null;

  constructor(private db: DatabaseService) {}

  ngOnInit() {
    this.db.getAllDrivers().subscribe((data: any) => {
      this.driversArray = data;
    });
  }

  deleteDriver(driverId: string) {
    this.db.deleteDriverById(driverId).subscribe(() => {
      this.ngOnInit(); // Refresh the list after deletion
    });
  }

  getAllPackages(driverId: string): void {
    this.selectedDriverId = driverId;
  
    const selectedDriver = this.driversArray.find((d) => d._id === driverId);
    console.log('Selected Driver:', selectedDriver);
  
    if (selectedDriver && selectedDriver.assigned_packages?.length) {
      this.packagesArray = selectedDriver.assigned_packages;
    } else {
      this.packagesArray = [];
    }
  
    console.log('Packages:', this.packagesArray);
  
  }
}
