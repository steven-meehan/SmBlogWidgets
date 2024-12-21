import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsContent } from '../news-content';
import { UrlInfo } from '../urlInfo';

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
  urlColumnWidth: number = 0;
  currentNewsItem: number = 0;
  numberOfNewsAlerts: number = 0;
  mainBodyWidth: number = 10;
  imageInfoCss: boolean = false;
  private numberOfLinks: number = 0;

  ngOnInit(){
    this.newsContent = this.newsItems[0];
    this.imageIsLink = this.checkIfImageIsUrl();
    this.numberOfNewsAlerts = this.newsItems.length;
    this.mainBodyWidth = this.numberOfNewsAlerts === 1 ? 12 : this.mainBodyWidth;
    this.calculateUrlColWidth();
    this.calculateCssClassToApply();
  }
  
  close(){
    this.activedModal.close();
  }

  next(){
    this.currentNewsItem = this.currentNewsItem + 1;
    if(this.currentNewsItem > (this.numberOfNewsAlerts-1)){
      this.currentNewsItem = 0;
    }
    this.processNextNewsAlert();
  }

  previous(){
    this.currentNewsItem = this.currentNewsItem - 1;
    if(this.currentNewsItem < 0){
      this.currentNewsItem = this.newsItems.length-1;
    }
    this.processNextNewsAlert();
  }

  calculateUrlColWidth(){
    this.numberOfLinks = 
      (this.checkUrlInfoValidity(this.newsItems[this.currentNewsItem].url1) ? 1 : 0) + 
      (this.checkUrlInfoValidity(this.newsItems[this.currentNewsItem].url2) ? 1 : 0) + 
      (this.checkUrlInfoValidity(this.newsItems[this.currentNewsItem].url3) ? 1 : 0);
    this.urlColumnWidth = 12/this.numberOfLinks;
  }

  checkUrlInfoValidity(urlInfo: UrlInfo | undefined | null): boolean {
    if(urlInfo === undefined || urlInfo === null){
      return false;
    }
    if(!urlInfo.url){
      return false;
    }
    if(urlInfo.url && (!urlInfo.title && !urlInfo.text)){
      return false;
    }
    return true;
  }

  checkIfImageIsUrl(): boolean {
    if(this.newsContent?.imageInfo.imageUrl){
      return true;
    }
    return false;
  }

  calculateCssClassToApply(){
    this.imageInfoCss = this.newsItems[this.currentNewsItem].imageInfo.showDropShadow ? true : false;
  }

  processNextNewsAlert(){
    this.newsContent = this.newsItems[this.currentNewsItem];
    this.imageIsLink = this.checkIfImageIsUrl();
    this.calculateUrlColWidth();
    this.calculateCssClassToApply();
  }
}
