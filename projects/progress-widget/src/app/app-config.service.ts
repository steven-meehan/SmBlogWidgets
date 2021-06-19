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
    return of(String(this.config.progressBarApiBaseUrl));
  }

  getProgressBarColor(): Observable<string> {
    return of(String(this.config.progressBarColor));
  }
}
