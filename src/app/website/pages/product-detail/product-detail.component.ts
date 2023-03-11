import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/index.models';
import { ProductListService } from 'src/app/services/product-list-service/product-list.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{

  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductListService,
    private router: Router,
  ){}

  ngOnInit(): void {
    
    this.route.paramMap
        .pipe(
          switchMap( params => {

            this.productId = params.get('id');
            if (this.productId) {
              return  this.productService.getProduct(this.productId);
            }
            return [null];
          })
        )
      .subscribe((data) => {
        this.product = data;
      });
  }

  goToBack(): void {

    this.router.navigateByUrl('/home');

  }

}
