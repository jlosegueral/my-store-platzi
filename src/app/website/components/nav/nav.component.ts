import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, User } from 'src/app/models/index.models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { StoreService } from 'src/app/services/store.service';




@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;

  profile: User | null = {
    id: 0,
    email: '',
    password: '',
    name: '',
    role: ''
  };

  categories : Category [] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();

    this.authService.user$
        .subscribe(data => {
          this.profile = data;
        })
  }

  toggleMenu(): void{
    this.activeMenu = !this.activeMenu;
  }

  login(): void {

     // this.authService.login('sebas@mail.com', '1212')
    // .subscribe(rta => {
    //   this.token = rta.access_token;
    //   console.log(this.token);
    //   this.getProfile();
    // });
    this.authService.loginAndGet('alexis@email.com', '123')
    .subscribe(() => {
      this.router.navigate(['/profile']);
    });

  }


  getAllCategories() {

    this.categoryService.getAll()
          .subscribe( (data: Category[]) => {
            this.categories = data;
          });
  }


  logOut() {

    this.authService.logOut();
    this.profile = null;
    this.router.navigate(['/home']);

  }


}