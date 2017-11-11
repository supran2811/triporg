import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor{
    
    public constructor(private store:Store<fromApp.AppState>){}


    intercept(req:HttpRequest<any> , next:HttpHandler) : Observable<HttpEvent<any>>{
        return this.store.select('auth').map((state:fromAuth.State) => {
              console.log(state.token);
              
              return state.token;
        }).switchMap(token => {
              if(token === ''){
                  token = sessionStorage.getItem('token');
              }
              console.log("NewToken : "+token);
              const clonedReq = req.clone({params : req.params.set('auth',token)});
              return next.handle(clonedReq);
        })
    }
}