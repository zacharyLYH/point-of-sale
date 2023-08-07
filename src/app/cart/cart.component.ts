import { Component } from '@angular/core';
import { StoreItemsService } from '../store-items.service';
import { Cart } from 'src/interfaces/cart';
import { StoreItem } from 'src/interfaces/storeItems';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart: Cart;
  total: number = 0;
  tax: number = 0;
  subtotal: number = 0;
  constructor(private itemsService: StoreItemsService, private router: Router) {
    this.cart = itemsService.getCart();
    this.costCalculator();
  }
  costCalculator() {
    this.total = 0;
    this.tax = 0;
    this.subtotal = 0;
    this.calculateTotal();
    this.calculateTax();
    this.calculateSubtotal();
  }
  calculateTotal() {
    this.total = 0;
    for (const c of this.cart.cart) {
      this.total +=
        (c.items.discountPrice === c.items.price
          ? c.items.price
          : c.items.discountPrice) * c.quantity;
    }
    this.total = parseFloat(this.total.toFixed(2));
  }
  calculateTax() {
    this.tax = this.total * 0.06;
    this.tax = parseFloat(this.tax.toFixed(2));
  }
  calculateSubtotal() {
    this.subtotal = this.tax + this.total;
    this.subtotal = parseFloat(this.subtotal.toFixed(2));
  }
  addToCart(item: StoreItem) {
    this.itemsService.manipulateCartService(item, 1);
    this.costCalculator();
  }
  removeFromCart(item: StoreItem) {
    this.itemsService.manipulateCartService(item, -1);
    this.costCalculator();
  }
  checkItemInCart(item: StoreItem): boolean {
    return this.itemsService.cartContainsItem(item);
  }
  numberOfThisItemInCart(item: StoreItem): number {
    return this.itemsService.numberInCart(item);
  }
  clearCart() {
    this.itemsService.cart.cart = [];
    this.router.navigateByUrl('/');
  }
}
