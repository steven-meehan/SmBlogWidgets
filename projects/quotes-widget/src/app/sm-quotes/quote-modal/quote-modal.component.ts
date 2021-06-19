import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Quote } from '../quote';

@Component({
  selector: 'app-quote-modal',
  templateUrl: './quote-modal.component.html',
  styleUrls: ['./quote-modal.component.css']
})
export class QuoteModalComponent implements OnInit {
  constructor(public activedModal: NgbActiveModal) { }

  @Input() selectedQuote!: Quote;

  ngOnInit() {
  }

  close(){
    this.activedModal.close();
  }
}