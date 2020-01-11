import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AutomaticLoginGuard implements CanActivate  {
  constructor(private router: Router, private firebaseService: FirebaseService) { }
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.firebaseService.user.pipe(
      take(1),
      map(user => {
        if (!user) {
          return true;
        } else {
          const role = user['role'];

          if (role == 'ADMIN') {
            this.router.navigateByUrl('/admin');
          }
          return false;
        }
      })
    );
  }
}
