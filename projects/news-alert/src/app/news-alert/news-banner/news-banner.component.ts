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
      if(!this.getCookie(this.cookieName)) {
        this.subscription
          .add(this.newsBannerContentService.retrieveContent()
            .subscribe(data => {
              let currentDate = new Date();
              let newsContents = data.filter((item) => 
                item.active && 
                currentDate < new Date(item.validUntil) &&
                currentDate > new Date(item.validFrom));
              this.newsContent = newsContents.length >= 1 ? newsContents : null;

              if(this.newsContent) {
                  this.open();
              } else {
                this.setCookie();
              }
            },
            error => { 
              console.log("There was an error retrieving the news alerts from the API"); 
              this.setCookie();
            }));
    } else {
      console.log(`${this.cookieName} cookie was found`)
    }
  }
  
  private subscription = new Subscription();
  private newsContent: NewsContent[] | null = null;
  private cookieName: string = environment.cookieName;
  private cookieValue: string = environment.cookieValue;

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
    console.log(`Setting cookie: ${this.cookieName} with value: ${this.cookieValue}`);
    let timeToAddToDate = environment.numberOfDaysToCahce * 24 * 60 * 60 * 1000;
    let expireDate = new Date(new Date().getTime() + timeToAddToDate).toUTCString();
    document.cookie = `${this.cookieName}=${this.cookieValue}; expires=${expireDate}; path=/;`;
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
