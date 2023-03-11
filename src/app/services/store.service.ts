import { Injectable } from '@angular/core';
import { Product } from '../models/index.models';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart:  Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);

  myCart$ = this.myCart.asObservable();

  getShoppingCart(): Product[] {
    return this.myShoppingCart
  }

  addProduct(product: Product): void {
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getTotal(): number{
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

}