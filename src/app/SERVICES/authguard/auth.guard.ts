import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private _router: Router, 
  ) {}

  canActivate():Observable<boolean>|boolean {
    var storageValue = localStorage.getItem('_ui') || false;
    if (storageValue) {
      return true;
    } else {
      this._router.navigate(['/workspace/login']);
    }
  }

  isAuterizaded() {
    var storageValue = localStorage.getItem('_ui') || false;
    if (storageValue) {
      return this._router.navigate(['/workspace']);
    }
  }
  
}
