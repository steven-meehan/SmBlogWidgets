import { Status } from "../status";
import { WorkType } from "../work-type";
import { WritingProject } from "../writing-project";

export class WorkInProgress{
    constructor(work: WritingProject){
        this.writingProject.active = work.active;
        this.writingProject.id = work.id;
        this.writingProject.series = work.series;
        this.writingProject.status = work.status;
        this.writingProject.title = work.title;
        this.writingProject.type = work.type;
        this.workTypeText = WorkType[this.writingProject.type];
        this.workStatusText = Status[this.writingProject.status];
        if(this.writingProject.status==1){
            this.percentage = 20;
        }
        else{
            this.percentage = Math.floor((this.writingProject.status/9)*100);
        }
    }
    
    writingProject: WritingProject = new WritingProject();
    workTypeText: string;
    workStatusText: string;
    percentage: number;
}

export var ErrorWorkInProgress = [
    new WorkInProgress({
      "id":1002,
      "active":true,
      "title":"In life, journeys are seldom easy. Despite the internet invading every aspect of our lives, data sometimes gets lost. While I’m disappointed that I cannot share the status of my curated projects, at least the articles are still available. My development team is pulling every log file available in their search for the problem. With fingers crossed, I’m hoping the required fix is simple so my team restores full functionality soon.",
      "type":0,
      "series":"",
      "status":0
    })
  ]