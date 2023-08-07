import { Component, Input } from '@angular/core';
import { StoreItem } from 'src/interfaces/storeItems';
import { StoreItemsService } from '../store-items.service';

@Component({
  selector: 'app-individual-items',
  templateUrl: './individual-items.component.html',
  styleUrls: ['./individual-items.component.css'],
})
export class IndividualItemsComponent {
  @Input() type: 'discount' | 'regular' = 'regular';
  @Input() items?: StoreItem[];
  constructor(private itemsService: StoreItemsService) {}
  addToCart(item: StoreItem) {
    this.itemsService.manipulateCartService(item, 1);
  }
  removeFromCart(item: StoreItem) {
    this.itemsService.manipulateCartService(item, -1);
  }
  checkItemInCart(item: StoreItem): boolean {
    return this.itemsService.cartContainsItem(item);
  }
  numberOfThisItemInCart(item: StoreItem): number {
    return this.itemsService.numberInCart(item);
  }
}
