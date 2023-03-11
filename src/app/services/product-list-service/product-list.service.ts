import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Product, PostProduct, PutProduct } from '../../models/index.models';
import { Observable, throwError, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from './../../../../src/environments/environment';
import { checkTime } from '../../interceptors/time/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  private _apiUrl = `${environment.API_URL}/api`;

  constructor(private http: HttpClient) { }

  getAllProducts(limit?: number, offset?: number): Observable<Product[]>{

    let params = new HttpParams();
    
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this._apiUrl, { params })
    .pipe(
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .16 * item.price
        }
      }))
    );
  }

  getByCategory(categoryId: string, limit?: number, offset?: number) {

    let params = new HttpParams();
    
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.http.get<Product[]>(`${this._apiUrl}/categories/${categoryId}/products`, { params });


  }

  getProduct(id: string): Observable<Product>{
    return this.http.get<Product>(`${this._apiUrl}/products/${id}`)
    .pipe(
      catchError((response: HttpErrorResponse) => {

       return {
          [HttpStatusCode.NotFound]             : throwError(() => new Error('El producto no existe')),
          [HttpStatusCode.BadRequest]           : throwError(() => new Error('Petición inválida.')),
          [HttpStatusCode.Conflict]             : throwError(() => new Error('Algo esta fallando en el server')),
          [HttpStatusCode.Unauthorized]         : throwError(() => new Error('No estas permitido')),
          [HttpStatusCode.InternalServerError]  : throwError(() => new Error('El servidor no puede procesar la petición.'))
        }[response.status] || throwError(() => new Error('Ups algo salio mal'))
      })
    );
  }

  // Paginacion
  getProductByPage(limit: number, offset: number): Observable<Product[]> {

    let params = new HttpParams();

    if (limit != undefined && offset != undefined) {
        params = params.set('limit', limit);
        params = params.set('offset', offset);
    }

    return this.http.get<Product[]>(`${this._apiUrl}/products`, {
      params: params,
      context: checkTime()
    })
    .pipe(
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .16 * item.price
        }
      }))
    )
    ;
  }

  postProduct(product: PostProduct): Observable<Product> {
     return this.http.post<Product>(`${this._apiUrl}`, product);
  }

  putProduct(id: string, product: PutProduct): Observable<Product> {
      return this.http.put<Product>(`${this._apiUrl}/products/${id}`, product);
  }

  deleteProduct(id:string): Observable<boolean>{
    return this.http.delete<boolean>(`${this._apiUrl}/products/${id}`);
  }

  fetchReadAndUpdate(id: string, product: PutProduct): Observable<[Product, Product]> {
    
    return  zip(
      this.getProduct(id),
      this.putProduct(id, product)
    );
    
  }

}