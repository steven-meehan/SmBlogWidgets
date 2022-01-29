import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { WritingProject } from './writing-project';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  constructor(
    appConfigService: AppConfigService,
    private http: HttpClient
  ) {
    console.log("Subscribing to the application config service to configure the web call");
    this.subscription
      .add(
        appConfigService.getProgressBarApiUrl()
          .subscribe(result => {
            this.progressBarApiBaseUrl = result;
          }));
  }

  private progressBarApiBaseUrl: string = '';
  private subscription = new Subscription();

  getWorksInProgress(): Observable<WritingProject[]> {
    let webRequestApi = `${this.progressBarApiBaseUrl}/api/progress/active`;
    console.log(`Url - ${webRequestApi}`);

    console.log("Making call to the Progress REST API");
    return this.http.get<WritingProject[]>(webRequestApi);
  }

}