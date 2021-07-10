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
          .subscribe(
            data => {
              this.worksInProgress = data.map( 
                item => new WorkInProgress(item)
              );
            },
            error => {
              this.worksInProgress = [
                new WorkInProgress({
                  "id":1002,
                  "active":true,
                  "title":"In life, journeys are seldom easy. Despite the internet invading every aspect of our lives, data sometimes gets lost. While I’m disappointed that I cannot share the status of my curated projects, at least the articles are still available. My development team is pulling every log file available in their search for the problem. With fingers crossed, I’m hoping the required fix is simple so my team restores full functionality soon.",
                  "type":0,
                  "series":"",
                  "status":0
                })
              ];
            }
          ));
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
