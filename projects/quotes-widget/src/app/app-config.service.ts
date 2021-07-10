import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AppConfig } from './app-config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  constructor() {
    console.log("Pulling the application config values");
    this.config = AppConfig
  }

  private config: any;

  getNumberOfQuotesToDisplay(): Observable<number> {
    console.log(`Pulling the number of Quotes to display - ${this.config.numberOfQuotesToDisplay}`);
    return of(Number(this.config.numberOfQuotesToDisplay));
  }

  GetNumberOfCharactersToDisplay(): Observable<number> {
    console.log(`Pulling the number of characters to display for each quote in the displayed list - ${this.config.numberOfCharactersToDisplay}`);
    return of(Number(this.config.numberOfCharactersToDisplay));
  }

  getQuoteApiUrl(): Observable<string> {
    console.log(`Pulling the base url for the quotes api - ${this.config.quoteApiBaseUrl}`);
    return of(String(this.config.quoteApiBaseUrl));
  }
}
