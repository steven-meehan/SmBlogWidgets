import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsContent } from '../news-content';

@Component({
  selector: 'app-news-banner-content',
  templateUrl: './news-banner-content.component.html',
  styleUrls: ['./news-banner-content.component.css']
})
export class NewsBannerContentComponent {
  constructor(public activedModal: NgbActiveModal) { }

  @Input() newsContent!: NewsContent;
  
  close(){
    this.activedModal.close();
  }
}
