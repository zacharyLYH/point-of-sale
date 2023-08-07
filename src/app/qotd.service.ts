import { Injectable } from '@angular/core';
import { Quote } from 'src/interfaces/quotes';

@Injectable({
  providedIn: 'root',
})
export class QotdService {
  constructor() {}
  readonly qotdUrl = 'https://api.quotable.io/quotes/random';

  async getQuote(): Promise<Quote> {
    const q = await fetch(this.qotdUrl);
    const quoteDecoded: Quote[] = await q.json();
    return quoteDecoded[0];
  }
}
