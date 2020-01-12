import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private firebaseService: FirebaseService) { }
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const expectedRole = route.data.role;

    return this.firebaseService.user.pipe(
      take(1),
      map(user => {
        if (!user) {
          return false;
        } else {
          const role = user['role'];
          if (expectedRole == role) {
            return true;
          } else {
            this.router.navigateByUrl('/');
            return false;
          }
        }
      })
    );
  }
}
