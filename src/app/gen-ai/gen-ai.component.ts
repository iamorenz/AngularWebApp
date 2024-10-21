import { Component } from '@angular/core';
import { Package } from '../models/package';
import { DatabaseService } from '../services/database.service';
import { CommonModule } from '@angular/common';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-gen-ai',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gen-ai.component.html',
  styleUrl: './gen-ai.component.css',
})
export class GenAIComponent {
  packageArray: Package[] = [];
  distances: { [key: string]: string } = {};

  private socket: any;

  constructor(private db: DatabaseService) {
    // Initialize Socket.io connection
    this.socket = io('http://localhost:8080');
  }

  ngOnInit() {
    this.db.getAllPackages().subscribe((data: any) => {
      this.packageArray = data;
    });

    // Listen for distance response from the server
    this.socket.on('distanceCalculated', (data: any) => {
      if (data.destination && data.distance) {
        this.distances[data.destination] = data.distance;
      } else {
        console.error(
          'Error: Received invalid distance data from server',
          data
        );
      }
    });
  }

  deletePackage(packageId: string) {
    this.db.deletePackageById(packageId).subscribe(() => {
      this.ngOnInit(); // Refresh the list after deletion
    });
  }

  sendDestination(destination: string) {
    console.log('Sending destination:', destination);
    // Emit event to backend with the package destination
    this.socket.emit('calculateDistance', { destination });
  }
}
