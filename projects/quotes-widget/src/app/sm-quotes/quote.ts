import { Speaker } from './speaker'
import { Source } from './source'

export class Quote{
    id: number = 0;
    speakers: Speaker[] = [];
    source: Source = new Source();
}