import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
    ){}

  canActivate(): Observable<boolean>  {


     return this.authService.user$
                .pipe(
                  map(user => {
                    if(user?.role === 'admin'){
                      return true;
                    }else{
                      this.router.navigate(['/home']);
                      return false;
                    }
                  })
                );
  }
  
}
