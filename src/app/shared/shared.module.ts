import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ReversePipe } from '../shared/pipes/reverse.pipe';
import { TimeAgoPipe } from '../shared/pipes/time-ago.pipe';
import { ReplaceVocalesPipe } from '../shared/pipes/replace-vocales.pipe';
import { HighlightDirective } from '../shared/directives/highlight.directive';

import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [

    ReversePipe,
    TimeAgoPipe,
    ReplaceVocalesPipe,
    HighlightDirective,
    ImgComponent,
    ProductComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  exports:[
    
    ReversePipe,
    TimeAgoPipe,
    ReplaceVocalesPipe,
    HighlightDirective,
    ImgComponent,
    ProductComponent,
    ProductListComponent

  ]

})
export class SharedModule { }
