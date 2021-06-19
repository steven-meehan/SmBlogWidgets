import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Quote } from './quote';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(
    appConfigService: AppConfigService,
    private http: HttpClient
  ) {
    this.subscription
      .add(
        appConfigService.getNumberOfQuotesToDisplay()
          .subscribe(result => {
            this.numberOfQuotesToDisplay = result;
          }))
      .add(
        appConfigService.getQuoteApiUrl()
          .subscribe(result => {
            this.quoteApiBaseUrl = result;
          }));
  }

  private numberOfQuotesToDisplay!: number;
  private quoteApiBaseUrl!: string;
  private subscription = new Subscription();

  getQuotes(): Observable<Quote[]> {
    let webRequestApi = `${this.quoteApiBaseUrl}/api/quote/random/${this.numberOfQuotesToDisplay}`;
    return this.http.get<Quote[]>(webRequestApi);
  }

}
