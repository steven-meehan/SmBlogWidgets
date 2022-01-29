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
            this.percentage = Math.floor((this.writingProject.status/8)*100);
        }
    }
    
    writingProject: WritingProject = new WritingProject();
    workTypeText: string;
    workStatusText: string;
    percentage: number;
}