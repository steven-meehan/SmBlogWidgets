import { Status } from "./status";
import { WorkType } from "./work-type";

export class WritingProject{
    id!: number;
    active!: boolean;
    title: string = "";
    series: string = "";
    type!: WorkType;
    status!: Status;
}