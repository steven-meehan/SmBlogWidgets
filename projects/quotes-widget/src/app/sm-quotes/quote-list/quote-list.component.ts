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
    this.currentCount = 0;
    this.toBeContinued = false;
    this.subscription
      .add(
        quoteService.getQuotes()
          .subscribe(
            data => this.listOfQuotes = data,
            error => this.listOfQuotes = [
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
            ] 
          ))
      .add(
        appConfigService.GetNumberOfCharactersToDisplay()
          .subscribe(result => {
            this.numberOfCharactersToDisplay = result;
          }));
  }

  subscription = new Subscription();
  listOfQuotes!: Quote[];
  numberOfCharactersToDisplay!: number;
  currentCount!: number;
  toBeContinued!: boolean;

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  open(quoteDetails: Quote) {
    const modalRef = this.modalService.open(QuoteModalComponent);
    modalRef.componentInstance.selectedQuote = quoteDetails;
  }

  quoteDisplayCondition(elementValue: Speaker): boolean {
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

  speakersCompleted(): string {
    let returnString: string = '';
    if (this.toBeContinued) {
      returnString = '...';
    }
    this.currentCount = 0;
    this.toBeContinued = false;
    return returnString;
  }

}
