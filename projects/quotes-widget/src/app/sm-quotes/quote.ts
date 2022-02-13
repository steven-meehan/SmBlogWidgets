import { Speaker } from './speaker'
import { Source } from './source'

export class Quote{
    id: number = 0;
    speakers: Speaker[] = [];
    source: Source = new Source();
}

export var ErrorQuoteList = [
    {
      id: 999,
      speakers: [
        {
          person: "Steven Meehan",
          words: "In life, journeys are seldom easy. Despite the internet invading every aspect of our lives, data sometimes gets lost. While I’m disappointed that my curated quotes are not being rendered, at least the articles are still available. My development team is pulling every log file available in their search for the problem. With fingers crossed, I’m hoping the required fix is simple so my team restores full functionality soon.",
          order: 1
        }
      ],
      source: {
        story: "stevenmeehan.com",
        series: ""
      }
    }
]