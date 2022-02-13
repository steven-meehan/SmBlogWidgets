import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppConfigService } from '../../app-config.service';
import { QuoteService } from '../quote.service';
import { Quote, ErrorQuoteList } from '../quote';
import { QuoteModalComponent } from '../quote-modal/quote-modal.component';
import { Speaker } from '../speaker';

@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit {

  constructor(
    appConfigService: AppConfigService,
    quoteService: QuoteService,
    private modalService: NgbModal
  ) {
    console.log("Constructing the quote list component");

    this.subscription
      .add(
        quoteService.getQuotes()
          .subscribe(
            data => {
              console.log("Retrieved Quotes from the API");
              this.listOfQuotes = data
            },
            error => {
              console.log("There was an error retrieving the Quotes from the API");
              this.quotes = ErrorQuoteList;
          ));
    this.subscription
      .add(
        appConfigService.GetNumberOfCharactersToDisplay()
          .subscribe(result => {
            this.numberOfCharactersToDisplay = result;
          }));
  }

  subscription = new Subscription();
  quotes: Quote[] = [];
  numberOfCharactersToDisplay: number = 0;
  currentCharacterCount: number = 0;
  toBeContinued: boolean = false;

  ngOnInit(): void {
    console.log("Initializing the list of quotes");
  }

  ngOnDestroy() {
    console.log("Cleaning up the quote list component");

    if (this.subscription) {
      console.log("Removing existing subscriptions");
      this.subscription.unsubscribe();
    }
  }

  openModal(quoteDetails: Quote) {
    console.log("Opening the Quote Modal");

    const modalRef = this.modalService.open(QuoteModalComponent);
    modalRef.componentInstance.selectedQuote = quoteDetails;
  }

  isSpeakerDisplayedInList(elementValue: Speaker): boolean {
    console.log(`Processing the words of ${elementValue.person}`);
    
    if (this.currentCount >= this.numberOfCharactersToDisplay) {
      if (elementValue.order > 1) {
        this.toBeContinued = true;
      }
      return false;
    }

    if (elementValue.order > 2) {
      this.toBeContinued = true;
      return false;
    }

    if (elementValue.words.length >= this.numberOfCharactersToDisplay) {
      this.currentCount = this.numberOfCharactersToDisplay;
      return true;
    } else {
      this.currentCount = this.currentCount + elementValue.words.length;
      return true;
    }
  }

  processFinalSpeakerOfQuote(): string {
    console.log("Processing the last speaker of the quote");

    let returnString: string = '';
    if (this.toBeContinued) {
      returnString = '...';
    }
    this.currentCount = 0;
    this.toBeContinued = false;
    return returnString;
  }

}
