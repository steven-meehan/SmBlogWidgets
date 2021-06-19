import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProgressBarService } from '../progress-bar.service';
import { WorkInProgress } from './work-in-progress';

@Component({
  selector: 'app-works-in-progress',
  templateUrl: './works-in-progress.component.html',
  styleUrls: ['./works-in-progress.component.css']
})
export class WorksInProgressComponent implements OnInit {

  constructor(
    progressBarService: ProgressBarService
  ) {
    this.subscription
      .add(
        progressBarService.getWorksInProgress()
          .subscribe(data => {
            this.worksInProgress = data.map( 
              item => new WorkInProgress(item)
            );
          }))
  }

  subscription = new Subscription();
  worksInProgress!: WorkInProgress[];

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
