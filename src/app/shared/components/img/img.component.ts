import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

  @Input() img = '';

  @Output() loaded = new EventEmitter<string>();

  imageDefault = './assets/images/imgDefault.jpg';

  
  imgError(): void {
      this.img = this.imageDefault;
      console.log(this.img);
  }

  imgLoaded(): void{
    console.log('log hijo');
    this.loaded.emit(this.img);
  }


}