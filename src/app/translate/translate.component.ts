import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Package } from '../models/package';
import { DatabaseService } from '../services/database.service';
import { io } from 'socket.io-client';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-translate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.css',
})
export class TranslateComponent {
  packageArray: Package[] = [];
  translations: { [key: string]: string } = {}; // To track translations for each package
  languages = [
    { code: 'zh-CN', name: 'Chinese (Simplified)' },
    { code: 'zh-TW', name: 'Chinese (Traditional)' },
    { code: 'es', name: 'Spanish' },
    { code: 'hi', name: 'Hindi' },
  ];
  selectedLanguages: { [key: string]: string } = {}; // To track selected language for each package

  private socket: any;

  constructor(private db: DatabaseService) {
    this.socket = io('http://localhost:8080');
  }

  ngOnInit() {
    this.db.getAllPackages().subscribe((data: any) => {
      this.packageArray = data;

      // Set default language for each package to prevent null issues
      this.packageArray.forEach((pkg) => {
        if (!this.selectedLanguages[pkg._id]) {
          this.selectedLanguages[pkg._id] = '';
        }
      });
    });

    // Listen for translated description from the server
    this.socket.on('descriptionTranslated', (data: any) => {
      if (data.description && data.targetLanguage) {
        this.translations[data.targetLanguage + data.packageId] =
          data.description;
        console.log(
          `Translated description for package ID ${data.packageId}: ${data.description}`
        );
      } else {
        console.error(
          'Error: Received invalid translation data from server',
          data
        );
      }
    });
  }

  sendTranslationRequest(packageId: string, description: string) {
    const targetLanguage = this.selectedLanguages[packageId];
    console.log(
      'Sending translation request:',
      description,
      'Language:',
      targetLanguage
    );

    this.socket.emit('translateDescription', {
      description,
      targetLanguage,
      packageId,
    });
  }

  onLanguageChange(packageId: string, event: Event) {
    const target = event.target as HTMLSelectElement;
    const languageCode = target.value;
    this.selectedLanguages[packageId] = languageCode;
  }
}
