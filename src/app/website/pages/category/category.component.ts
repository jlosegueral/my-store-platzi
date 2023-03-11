import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/index.models';


import { switchMap } from 'rxjs/operators';
import { ProductListService } from 'src/app/services/product-list-service/product-list.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{

  categoryId: string | null = null;
  products: Product[] = [];
  productId: string | null = null;

  limit = 10;
  offset = 0;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductListService,
  ){}
  
  
  ngOnInit(): void {
    this.route.paramMap
        .pipe(
          switchMap( params => {

            this.categoryId = params.get('id');
            if (this.categoryId) {
              return  this.productService.getByCategory(this.categoryId, this.limit, this.offset);
            }
            return [];
          })
        )
      .subscribe((data) => {
        this.products = data;
      });

      this.route.queryParamMap.subscribe(params => {
        this.productId = params.get('product');
        console.log(this.productId);
    });
  }

}
