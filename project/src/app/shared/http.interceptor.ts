import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor{
    
    public constructor(private store:Store<fromApp.AppState>){}
    
    intercept(req:HttpRequest<any> , next:HttpHandler) : Observable<HttpEvent<any>>{
      const baseUrl = environment.baseUrl;
      console.log("Base url ==== ",baseUrl);
      return this.store.select('auth').take(1).map((state:fromAuth.State) => {
              return state.token;
        }).switchMap(token => {
   
              const clonedReq = req.clone({url:`${baseUrl}${req.url}.json`,params : req.params.set('auth',token)});
              
              return next.handle(clonedReq);
        })
    }
}