import { Injectable, Injector } from '@angular/core';
import { HttpHandler, HttpInterceptor } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private servive: UserService) { }
  intercept(req: any, next: any) {
    const accessToken = sessionStorage.getItem("token");
    //Check if accesToken exists, else send request without bearer token
    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          `Bearer ${accessToken}`
        )


      });
      console.log('Token added to HTTP request');
      return next.handle(cloned);
    }
    else {
      //No token; proceed request without bearer token
      console.log('No token added to HTTP request');
      return next.handle(req);
    }


  }
}
