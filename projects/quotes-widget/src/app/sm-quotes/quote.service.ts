import { Injectable, OnDestroy } from '@angular/core';
import { Observable, timer, Subscription, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap, share, retry, takeUntil } from 'rxjs/operators';

import { Quote } from './quote';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteService implements OnDestroy {

  constructor(
    appConfigService: AppConfigService,
    private http: HttpClient
  ) {
    this.quoteApiBaseUrl = '';
    this.numberOfQuotesToDisplay = 0;
    this.quotePollingIntervalInSeconds = 3000;

    console.log("Retrieving and setting the number of quotes to pull from the api");
    this.subscription
      .add(
        appConfigService.getNumberOfQuotesToDisplay()
          .subscribe((result: number) => {
            this.numberOfQuotesToDisplay = result;
          }));

    console.log("Retrieving and setting the url for the api");
    this.subscription
      .add(
        appConfigService.getQuoteApiUrl()
          .subscribe((result: string) => {
            this.quoteApiBaseUrl = result;
          }));

    console.log("Retrieving and setting the number of seconds for the polling interval of the api");
    this.subscription
    .add(
      appConfigService.getQuotePollingIntervalInSeconds()
        .subscribe((result: number) => {
          this.quotePollingIntervalInSeconds = result;
        }));

    console.log("Determining if polling is enabled");
    this.subscription
      .add(
        appConfigService.isQuotePollingEnabled()
          .subscribe((result: Boolean) => {
            this.isQuotePollingEnabled = result;
          }));
    
    if(this.isQuotePollingEnabled){
      console.log("Setting up the polling mechanism");
      this.quotes = timer(1, this.quotePollingIntervalInSeconds)
        .pipe(
          switchMap(() => this.retrieveQuotes()),
          retry(),
          share(),
          takeUntil(this.stopPolling));
    } else {
      console.log("Making a single call to the api");
      this.quotes = this.retrieveQuotes();
    }
  }

  private numberOfQuotesToDisplay: number;
  private quotePollingIntervalInSeconds: number;
  private quoteApiBaseUrl: string;
  private subscription = new Subscription();
  private quotes: Observable<Quote[]>;
  private isQuotePollingEnabled: Boolean = false;
  private stopPolling = new Subject();

  ngOnDestroy() {
    if(this.isQuotePollingEnabled){
      this.stopPolling.next(Quote);
    }
  }

  retrieveQuotes(): Observable<Quote[]> {
    console.log(`Retrieving ${this.numberOfQuotesToDisplay} quotes from the api`);

    let webRequestApi = `${this.quoteApiBaseUrl}/api/quote/random/${this.numberOfQuotesToDisplay}`;
    console.log(`Constructed url - ${webRequestApi}`);

    console.log("Making call to the api");
    return this.http.get<Quote[]>(webRequestApi);
  }

  getQuotes(): Observable<Quote[]> {
    return this.quotes;
  }
}
