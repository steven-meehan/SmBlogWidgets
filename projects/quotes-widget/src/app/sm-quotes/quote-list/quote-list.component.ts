import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Quote } from '../quote';
import { Speaker } from '../speaker';
import { QuoteModalComponent } from '../quote-modal/quote-modal.component';
import { AppConfigService } from '../../app-config.service';
import { QuoteService } from '../quote.service';

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
    this.currentCount = 0;
    this.toBeContinued = false;
    this.numberOfCharactersToDisplay = 0;

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
              this.listOfQuotes = [
              {
                id: 999,
                speakers: [
                  {
                    person: "Steven Meehan",
                    words: "In life, journeys are seldom easy. Despite the internet invading every aspect of our lives, data sometimes gets lost. While I’m disappointed that my curated quotes are not being rendered, at least the articles are still available. My development team is pulling every log file available in their search for the problem. With fingers crossed, I’m hoping the required fix is simple so my team restores full functionality soon.",
                    order: 0
                  }
                ],
                source: {
                  story: "stevenmeehan.com",
                  series: ""
                }
              }
            ]} 
          ))
      .add(
        appConfigService.GetNumberOfCharactersToDisplay()
          .subscribe(result => {
            this.numberOfCharactersToDisplay = result;
          }));
  }

  subscription = new Subscription();
  listOfQuotes: Quote[] = [];
  numberOfCharactersToDisplay: number;
  currentCount: number;
  toBeContinued: boolean;

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
