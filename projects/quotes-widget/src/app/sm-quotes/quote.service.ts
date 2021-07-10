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
    console.log("Subscribing to the application config service to configure the web call");
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
    console.log(`Retrieving ${this.numberOfQuotesToDisplay} Quotes`);

    let webRequestApi = `${this.quoteApiBaseUrl}/api/quote/random/${this.numberOfQuotesToDisplay}`;
    console.log(`Url - ${webRequestApi}`);

    console.log("Making call to the Quote REST API");
    return this.http.get<Quote[]>(webRequestApi);
  }

}
