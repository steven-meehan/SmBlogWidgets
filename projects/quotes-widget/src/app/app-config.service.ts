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

  getNumberOfQuotesToDisplay(): Observable<number> {
    return of(Number(this.config.numberOfQuotesToDisplay));
  }

  GetNumberOfCharactersToDisplay(): Observable<number> {
    return of(Number(this.config.numberOfCharactersToDisplay));
  }

  getQuoteApiUrl(): Observable<string> {
    return of(String(this.config.quoteApiBaseUrl));
  }
}
