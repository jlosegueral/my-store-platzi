import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/index.models';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = `${environment.API_URL}/api/categories`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(limit?: number, offset?: number): Observable<Category[]>{
    let params = new HttpParams();
    if (limit && offset){
      params = params.set('limit', limit),
      params = params.set('offset', offset)
    }
    return this.http.get<Category[]>(this.apiUrl, {params})
  }
}

