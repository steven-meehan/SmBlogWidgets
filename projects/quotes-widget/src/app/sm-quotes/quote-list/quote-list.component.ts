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
              this.quotes = data;

              data.forEach(function (quote) {
                quote.speakers.forEach(function (speaker) {
                  console.log(`Retrieved words for ${speaker.person}`);
                })

                console.log(`Collected all speakers for quote ${quote.id}, taken from ${quote.source.story}`);
              });
            },
            error => {
              console.log("There was an error retrieving the Quotes from the API");
              this.quotes = ErrorQuoteList;
            } 
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

  displaySpeaker(speaker: Speaker): boolean {
    if(speaker.order === 1) {
        this.currentCharacterCount += speaker.words.length;
        return true;
    } else {
      this.toBeContinued = true;
    }

    return false;
  }

  openModal(quoteDetails: Quote) {
    console.log("Opening the Quote Modal");

    const modalRef = this.modalService.open(QuoteModalComponent);
    modalRef.componentInstance.selectedQuote = quoteDetails;
  }

  processEndOfQuote(): string {
    let returnString: string = '';

    if (this.toBeContinued) {
      returnString = '...';
    }

    this.currentCharacterCount = 0;
    this.toBeContinued = false;
    
    return returnString;
  }
}
