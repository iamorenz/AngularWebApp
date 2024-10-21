import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Package } from '../models/package';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-package.component.html',
  styleUrl: './delete-package.component.css',
})
export class DeletePackageComponent {
  package: Package = new Package('', 0, '', '', false);

  constructor(private db: DatabaseService, private router: Router) {}

  deletePackage() {
    this.db.deletePackageById(this.package._id).subscribe({
      next: () => {
        this.router.navigate(['list-packages']);
      },
      error: (error) => {
        console.log(error);
        this.router.navigate(['invalid-data']);
      },
    });
  }
}
