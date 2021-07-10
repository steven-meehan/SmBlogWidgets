import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AppConfig } from './app-config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  constructor() {
    this.config = AppConfig
  }

  private config: any;

  getProgressBarApiUrl(): Observable<string> {
    console.log(`Pulling the base url for the progress api - ${this.config.progressBarApiBaseUrl}`);
    return of(String(this.config.progressBarApiBaseUrl));
  }

  getProgressBarColor(): Observable<string> {
    console.log(`Pulling the bootstrap color for the progress bar - ${this.config.progressBarColor}`);
    return of(String(this.config.progressBarColor));
  }
}
