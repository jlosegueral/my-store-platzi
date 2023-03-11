import { Component, OnInit } from '@angular/core';

import { UsersService } from './services/users/users.service';
import { FilesService } from './services/file/files.service';
import { AuthService } from './services/auth/auth.service';
import { TokenService } from './services/token/token.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  imgParent = '';
  token = '';
  imgRta = '';

  constructor(
    private userService: UsersService,
    private fileService: FilesService,
    private authService: AuthService,
    private tokenService: TokenService
  ){}


  ngOnInit(): void {

    const token = this.tokenService.getToken();

    if(token) {
        this.authService.getProfile()
            .subscribe();
    }

  }

  onLoaded(img: string):void{
    console.log('log padre', img);
  }

  createUser(): void {
    this.userService.create({
      name: 'Alejandra',
      email: 'ale@gmail.com',
      password: '12345',
      role: 'customer'
    })
    .subscribe(response => {
      console.log(response);
    });
  }

  downloadPdf(): void {

    this.fileService.getFile('my pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
        .subscribe()

  }

  onUpload(event: Event) {

    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);

    if(file) {

      this.fileService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      });

    }

   
  }


}