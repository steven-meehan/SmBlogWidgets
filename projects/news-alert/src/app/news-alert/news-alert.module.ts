import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsBannerComponent } from './news-banner/news-banner.component';
import { NewsBannerContentComponent } from './news-banner-content/news-banner-content.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [
    NewsBannerComponent,
    NewsBannerContentComponent
  ]
})
export class NewsAlertModule { }
