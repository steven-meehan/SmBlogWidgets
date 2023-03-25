import { DoBootstrap, NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SmQuotesModule } from './sm-quotes/sm-quotes.module'
import { QuoteListComponent } from './sm-quotes/quote-list/quote-list.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        SmQuotesModule,
        BrowserModule,
        HttpClientModule,
        NgbModule
    ],
    providers: []
})
export class AppModule implements DoBootstrap { 

  constructor(private injector: Injector) {
    const webComponent = createCustomElement(QuoteListComponent, {injector});
    customElements.define('quote-list-component', webComponent);
  }

  ngDoBootstrap() {}
 }
