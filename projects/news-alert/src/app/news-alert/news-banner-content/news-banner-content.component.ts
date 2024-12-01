import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsContent } from '../news-content';

@Component({
  selector: 'app-news-banner-content',
  templateUrl: './news-banner-content.component.html',
  styleUrls: ['./news-banner-content.component.css']
})
export class NewsBannerContentComponent implements OnInit {
  constructor(public activedModal: NgbActiveModal) { }

  @Input() newsItems!: NewsContent[];
  newsContent: NewsContent | null = null;
  imageIsLink: boolean = false;
  mediumColumnLength: number = 0;

  currentNewsItem: number = 0;
  private numberOfLinks: number = 0;

  ngOnInit(){
    if(this.newsContent.imageInfo.imageUrl){
      this.imageIsLink = true;
    }
    this.numberOfLinks = (this.newsContent.url1 ? 1 : 0) + (this.newsContent.url2 ? 1 : 0) + (this.newsContent.url3 ? 1 : 0);
    this.mediumColumnLength = 12/this.numberOfLinks;
    this.newsContent = this.newsItems[0];
  }
  
  close(){
    this.activedModal.close();
  }
}
