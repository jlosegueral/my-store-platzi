import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../../src/environments/environment';
import { User, PostUser } from 'src/app/models/index.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _apiUrl = `${environment.API_URL}/api/users`;

  constructor(private http: HttpClient) { }

  create(postUser: PostUser): Observable<User>{

    return this.http.post<User>(this._apiUrl, postUser);

  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this._apiUrl);
  }

}
