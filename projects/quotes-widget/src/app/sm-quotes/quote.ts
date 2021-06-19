import { Speaker } from './speaker'
import { Source } from './source'

export class Quote{
    id!: number;
    speakers!: Speaker[];
    source!: Source;
}