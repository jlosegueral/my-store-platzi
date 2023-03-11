import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product: Product = {
    id:          '',
    title:       '',
    price:       0,
    description: '',
    category:    {
      id: 0,
      name: '',
      typeImg: ''
    },
    images:      []
  };

  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();

  onAddToCart(): void {
    this.addedProduct.emit(this.product);
  }

  onShowDetail(): void {

    this.showProduct.emit(this.product.id);

  }

}