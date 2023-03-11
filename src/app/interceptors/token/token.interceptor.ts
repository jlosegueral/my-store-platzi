import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = this.addToken(request);
    return next.handle(request);

  }

  private addToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders().
    set('Authorization', `Bearer ${token}`);

    if (token){

        const authRequest = request.clone({ headers });
        return authRequest;
    }

    return request;

  }
}
