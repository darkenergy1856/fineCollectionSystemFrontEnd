import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

// Add URL for Pay Ticket;
// Add URL for Search Ticket;
// Add URL for Ticket Status;
export class InterceptService implements HttpInterceptor {

  constructor(private loginService : LoginService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const skipIntercept = req.headers.has('skipAuth')

    if (skipIntercept) {
      req = req.clone({
          headers: req.headers.delete('skipAuth')
      });
      return next.handle(req)
  }

    if (req.url === 'http://localhost:8888/oauth/token') {
      return next.handle(req)
    } else {
      const modifiedRequest = req.clone({ headers: req.headers.append('Authorization', 'Bearer ' + this.loginService.getToken()) })
      return next.handle(modifiedRequest);
    }
  }
}
