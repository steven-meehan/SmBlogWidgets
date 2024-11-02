import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NewsContent } from './news-content';

@Injectable({
  providedIn: 'root'
})
export class NewsBannerContentService implements OnDestroy {

  constructor(private http: HttpClient) { }

  private subscription = new Subscription();
  
  retrieveContent(): Observable<NewsContent[]> {
    console.log('Retrieving configuration for news alerts')
    
    let webRequestApi =  `${environment.configurationBaseUrl}/config.json`;
    console.log(`Constructed url - ${webRequestApi}`);

    console.log("Making call to the api");

    return this.http.get<NewsContent[]>(webRequestApi);
  }

  ngOnDestroy() { 
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
