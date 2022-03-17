import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class authGuardAdmin implements CanActivate, OnInit, OnDestroy {

  private loginAuthority: Subscription = new Subscription;

  private accessType: string = ''

  constructor(private loginService: LoginService, private router: Router) {
    this.loginAuthority = this.loginService.authority.subscribe(authority => {
      this.accessType = authority
    })
  }

  ngOnInit(): void {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.loginService.getToken() && (this.accessType === 'ADMIN')) {
      return true
    } else {
      return this.router.createUrlTree(['/login'])
    }
  }

  ngOnDestroy(): void {
    this.loginAuthority.unsubscribe()
  }

}
