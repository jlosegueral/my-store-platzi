import { Component, EventEmitter, Input, Output } from '@angular/core';
import { switchMap } from "rxjs/operators";
import { PostProduct, Product, PutProduct } from 'src/app/models/index.models';
import { ProductListService } from 'src/app/services/product-list-service/product-list.service';
import { StoreService } from 'src/app/services/store.service';




import Swal from'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent  {


  myShoppingCart:  Product[] = [];
  total = 0;

  @Input() products: Product[] =[];
  //@Input() productId: string | null = null;
  @Input() 
  set productId(id: string | null) {
      if(id) {
        this.onShowDetail(id);
      }
  }


  today: Date = new Date();
  date: Date = new Date(2021, 1, 21);

  showProductDetail = false;
  productChosen: Product = {
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

  // limit = 10;
  // offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productListService: ProductListService
    ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  // ngOnInit(): void {

  //   // this.productListService.getProductByPage(10, 0)
  //   //   .subscribe( data => {
  //   //     this.products = data;
  //   //   });

  //   this.loadData();

  // }

  @Output() onloadMore: EventEmitter<string> = new EventEmitter<string>();

  onAddToShoppingCar(product: Product): void {
    // this.myShoppingCart.push(product);

    this.storeService.addProduct(product);

    // this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);

    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(): void {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string): void {


     //en caso de que den dos veces al botón solo ocultara los detalles(para no ir a darle al botón de cerrar)
     if( this.productChosen.id === id && this.showProductDetail===true){
      this.showProductDetail = false;
      return;
    }
   
    //en caso de que seleccionen el mismo producto ya no hay necesidad de hacer la petición de nuevo y solo vuelve a mostrar el panel
    if( this.productChosen.id === id && this.showProductDetail===false){
      this.showProductDetail = true;
      return;
    }
    //en caso que le den al botón de ver detalles mientras ya están abiertos los de un producto diferente cierra el panel de detalles
    if( this.productChosen.id != id && this.showProductDetail===true){
      this.showProductDetail = false;
    }

    this.statusDetail = 'loading';

    if(!this.showProductDetail) {
        this.showProductDetail = true;
    }

    this.productListService.getProduct(id)
    .subscribe({

        next: (data) => {

        this.productChosen = data;
        this.statusDetail = 'success'
          
     },
     error: (errorMsg) => {
      this.statusDetail = 'error';
      console.log(errorMsg);
      Swal.fire({
        title: 'Error!',
        //text: errorMsg.error.message,
        text: errorMsg,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }

    });

  }

  readAndUpdate(id: string): void {

    this.productListService.getProduct(id)
    .pipe(
      switchMap((product) => this.productListService.putProduct(product.id, {title: 'Change'})
      )
    )
    .subscribe(data => {
      console.log(data);
    });

    this.productListService.fetchReadAndUpdate(id, {title: 'Change con zip'})
    .subscribe(response => {

      const read = response[0];
      const update = response[1];

      console.log('read => ', read);
      console.log('update => ', update);


    })

  }

  createNewProduct(): void{

    const poroduct: PostProduct = {

      title:       'NUevo Producto',
      price:       1000,
      description: 'blalala bla bla bla',
      images:      [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      categoryId:  2
    };


    this.productListService.postProduct(poroduct)
    .subscribe(data => {
      this.products.unshift(data);
    });
  }

  updateProduct(): void{

    const changes: PutProduct = {

      title:       'Producto Editado',
      
    }

    const id = this.productChosen.id;
    this.productListService.putProduct(id, changes)
    .subscribe(data =>{
      this.productChosen = data;
      this.products = this.products.map((product) =>{
        
        if(product.id === data.id){
          return data;
        }

        return product;

      });
    });

  }

  ereaseProduct(): void {

    const id = this.productChosen.id;

    
    this.productListService.deleteProduct(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });


  }

  // loadData(): void {

  //   this.productListService.getProductByPage(this.limit, this.offset)
  //     .subscribe( data => {
  //       this.products.push(...data);
  //       this.offset += this.limit;
  //     });
      

  // }

  loadMore() {
    this.onloadMore.emit();
  }

}