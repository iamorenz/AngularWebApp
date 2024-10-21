import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent {
  statistics: any = {
    insert: 0,
    delete: 0,
    update: 0,
    retrieve: 0,
    drivers: 0,
    packages: 0,
  };

  constructor(private db: DatabaseService) {}

  ngOnInit() {
    this.db.getStatistics().subscribe((data: any) => {
      this.statistics = data;
    });
  }
}
