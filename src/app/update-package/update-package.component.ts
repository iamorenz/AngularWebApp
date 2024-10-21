import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Package } from '../models/package';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.css',
})
export class UpdatePackageComponent {
  package: Package = new Package('', 0, '', '', false);

  constructor(private db: DatabaseService, private router: Router) {}

  updatePackage() {
    this.db.updatePackageById(this.package).subscribe({
      next: () => {
        this.router.navigate(['list-packages']);
      },
      error: () => {
        this.router.navigate(['invalid-data']);
      },
    });
  }
}
