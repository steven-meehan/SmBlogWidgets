import { Component, inject } from '@angular/core';
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
export class NewsBannerComponent {
  constructor(
    private newsBannerContentService: NewsBannerContentService,
    private modalService: NgbModal = inject(NgbModal)) { 
      
    if(!sessionStorage.getItem("DoNotDisplayNews")) {
      this.subscription
        .add(this.newsBannerContentService.retrieveContent()
          .subscribe(data => {
            console.log("Retrieving News Alerts from the server");
            let currentDate = new Date();
            let newsContents = data.filter((item) => 
              item.active && 
              currentDate < new Date(item.validUntil) &&
              currentDate > new Date(item.validFrom));
            this.newsContent = newsContents.length >= 1 ? newsContents[0] : null;

            if(this.newsContent) {
                this.open();
            } else {
              sessionStorage.setItem("DoNotDisplayNews", "true");
            }
          },
          error => { 
            console.log("There was an error retrieving the news alerts from the API"); 
            sessionStorage.setItem("DoNotDisplayNews", "true");
          }));
    }
  }
  
  subscription = new Subscription();
  newsContent: NewsContent | null | undefined = null;

  open() {
    if(environment.setDoNotDhowFlag){
      sessionStorage.setItem("DoNotDisplayNews", "true");
    }

    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false
    };

    const modalRef = this.modalService.open(NewsBannerContentComponent, ngbModalOptions);
    modalRef.componentInstance.newsContent = this.newsContent;
  }
}
