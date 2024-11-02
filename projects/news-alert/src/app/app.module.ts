import { DoBootstrap, NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NewsAlertModule } from './news-alert/news-alert.module';
import { NewsBannerComponent } from './news-alert/news-banner/news-banner.component';

@NgModule({ declarations: [
        AppComponent
    ], imports: [NewsAlertModule,
        BrowserModule,
        NgbModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule implements DoBootstrap { 

  constructor(private injector: Injector) {
    const webComponent = createCustomElement(NewsBannerComponent, {injector});
    customElements.define('news-banner-alert', webComponent);
  }

  ngDoBootstrap() {}
 }
