import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteListComponent } from './quote-list/quote-list.component';
import { QuoteModalComponent } from './quote-modal/quote-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LibsModule } from '../libs/libs.module';



@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    LibsModule,
  ],
  declarations: [
    QuoteListComponent, 
    QuoteModalComponent
  ]
})
export class SmQuotesModule { }
