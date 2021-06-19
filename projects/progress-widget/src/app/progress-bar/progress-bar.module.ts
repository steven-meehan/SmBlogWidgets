import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { WorksInProgressComponent } from './works-in-progress/works-in-progress.component';


@NgModule({
  declarations: [WorksInProgressComponent],
  imports: [
    CommonModule,
    NgbModule
  ]
})
export class ProgressBarModule { }
