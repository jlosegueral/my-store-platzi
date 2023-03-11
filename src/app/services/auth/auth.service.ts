import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../../src/environments/environment';
import { Auth, User } from 'src/app/models/index.models';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from '../token/token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _apiUrl = `${environment.API_URL}/api/auth`;

  private _user = new BehaviorSubject<User | null>(null);
  user$ = this. _user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
    ) { }

  login(email: string, password: string): Observable<Auth> {

    return this.http.post<Auth>(`${this._apiUrl}/login`,{email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );

  }

  getProfile(): Observable<User> {

    // const headers = new HttpHeaders().
    // set('Authorization', `Bearer ${token}`);

    // return this.http.get<User>(`${this._apiUrl}/profile`, {headers} );

    return this.http.get<User>(`${this._apiUrl}/profile`)
                .pipe(
                  tap(user => this._user.next(user))
                );

  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.getProfile()),
    )
  }

  logOut(): void {
    this.tokenService.removeToken();
  }

}
