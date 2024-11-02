import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { ProgressBarModule } from './progress-bar/progress-bar.module';
import { WorksInProgressComponent } from './progress-bar/works-in-progress/works-in-progress.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({ declarations: [
        AppComponent
    ], imports: [BrowserModule,
        ProgressBarModule,
        NgbModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule implements DoBootstrap { 

  constructor(private injector: Injector) {
    const webComponent = createCustomElement(WorksInProgressComponent, {injector});
    customElements.define('works-in-progress', webComponent);
  }

  ngDoBootstrap() {}
 }
