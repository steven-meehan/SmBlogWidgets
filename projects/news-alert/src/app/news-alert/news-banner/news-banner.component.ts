import { Component, inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { NewsContent } from '../news-content';
import { NewsBannerContentComponent } from '../news-banner-content/news-banner-content.component';
import { NewsBannerContentService } from '../news-banner-content.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-news-banner',
  templateUrl: './news-banner.component.html',
  styleUrls: ['./news-banner.component.css']
})
export class NewsBannerComponent implements OnDestroy {
  constructor(
    private newsBannerContentService: NewsBannerContentService,
    private modalService: NgbModal = inject(NgbModal)) { 
      
      this.subscription
        .add(this.newsBannerContentService.retrieveContent()
          .subscribe(data => {
            console.log("Retrieving News Alerts from the server");
            let currentDate = new Date();
            let newsContents = data.filter((item) => 
              item.active && 
              currentDate < new Date(item.validUntil) &&
              currentDate > new Date(item.validFrom));
            this.newsContent = newsContents.length >= 1 ? newsContents : null;
      if(!this.getCookie(environment.cookieName)) {

            if(this.newsContent) {
                this.open();
            } else {
            }
          },
          error => { 
            console.log("There was an error retrieving the news alerts from the API"); 
          }));
              this.setCookie();
    }
  }
  
  private subscription = new Subscription();
  private newsContent: NewsContent[] | null = null;

  open() {
    if(environment.setDoNotShowFlag){
      this.setCookie();
    }
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false
    };
    const modalRef = this.modalService.open(NewsBannerContentComponent, ngbModalOptions);
    modalRef.componentInstance.newsItems = this.newsContent;
  }

  setCookie(): void {
    let date = new Date();
    let expireDate = new Date(date.getTime() + environment.numberOfDaysToCahce * 24 * 60 * 60 * 1000);
    document.cookie = `${environment.cookieName}=${environment.cookieValue}; expires=${expireDate.toUTCString()}; path=/;`;
  }

  getCookie(name: string): string | null {
    let regex = new RegExp(`(^| )${name}=([^;]+)`);
    let match = document.cookie.match(regex);
    if (match) {
      return match[2];
    }
    return null;
  }

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
