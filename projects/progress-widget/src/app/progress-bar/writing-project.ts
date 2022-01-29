import { Status } from "./status";
import { WorkType } from "./work-type";

export class WritingProject{
    id: number = 0;
    active: boolean = false;
    title: string = "";
    series: string = "";
    type: WorkType = 2;
    status: Status = 1;
}