import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/index.models';
import { ProductListService } from 'src/app/services/product-list-service/product-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  products: Product[] = [];

  limit = 10;
  offset = 0;

  productId: string | null = null;

  constructor(
    private productListService: ProductListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.productListService.getProductByPage(10, 0)
      .subscribe( data => {
        this.products = data;
        this.offset += this.limit;
      });

      this.route.queryParamMap.subscribe(params => {
          this.productId = params.get('product');
          console.log(this.productId);
      });

  }

  loadMore(): void {

    this.productListService.getProductByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data.filter(product => product.images.length > 0));
      this.offset += this.limit;
    });

  }

}
