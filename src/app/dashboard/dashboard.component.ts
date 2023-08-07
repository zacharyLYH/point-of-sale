import { Component, OnInit } from '@angular/core';
import { StoreItem } from 'src/interfaces/storeItems';
import { StoreItemsService } from '../store-items.service';
import { QotdService } from '../qotd.service';
import { Quote } from 'src/interfaces/quotes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  discountItems: StoreItem[] = [];
  regularItems: StoreItem[] = [];
  quoteObj: Quote = {} as Quote;

  constructor(
    private storeItemsService: StoreItemsService,
    private qotd: QotdService
  ) {}

  async ngOnInit() {
    const allItems: StoreItem[] = this.storeItemsService.getAllStoreItems();
    for (const i of allItems) {
      if (i.price === i.discountPrice) {
        this.regularItems.push(i);
      } else {
        this.discountItems.push(i);
      }
    }
    this.quoteObj = await this.qotd.getQuote();
  }
}
