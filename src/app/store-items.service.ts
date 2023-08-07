import { Injectable } from '@angular/core';
import { items } from 'src/assets/store-items';
import { Cart } from 'src/interfaces/cart';
import { InCartItems } from 'src/interfaces/inCartItems';
import { StoreItem } from 'src/interfaces/storeItems';

@Injectable({
  providedIn: 'root',
})
export class StoreItemsService {
  constructor() {}
  cart: Cart = { cart: [] as InCartItems[] };
  getAllStoreItems(): StoreItem[] {
    return items;
  }
  getCart(): Cart {
    return this.cart;
  }
  cartContainsItem(item: StoreItem): boolean {
    return this.cart.cart.some((i) => i.items.name === item.name);
  }
  numberInCart(item: StoreItem): number {
    let quantity = 0;
    this.cart.cart.forEach((inCartItem) => {
      if (inCartItem.items.name === item.name) {
        quantity = inCartItem.quantity;
      }
    });
    return quantity;
  }

  manipulateCartService(item: StoreItem, action: number) {
    // Look for the item in the cart
    let cartItem = this.cart.cart.find((i) => i.items.name === item.name);

    // If the item is not in the cart, add it
    if (!cartItem) {
      this.cart.cart.push({ items: item, quantity: action });
    } else {
      // If the item is in the cart, adjust the quantity
      cartItem.quantity += action;

      // If the quantity becomes 0 or less, remove the item from the cart
      if (cartItem.quantity <= 0) {
        this.cart.cart = this.cart.cart.filter(
          (i) => i.items.name !== item.name
        );
      }
    }
  }
}
