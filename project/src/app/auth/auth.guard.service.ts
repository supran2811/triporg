import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

 import * as fromApp from '../store/app.reducer';    
 import * as fromAuth from './store/auth.reducer';       

@Injectable()            
export class AuthGuardService implements CanActivate{

    constructor(private store:Store<fromApp.AppState>,
                private router:Router){}

    canActivate(router:ActivatedRouteSnapshot , state:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
        return this.store.select('auth').take(1).map( (authState:fromAuth.State) =>{
                    
                    if(!authState.authorised){
                        this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
                    }

                    return authState.authorised;
        } )
    }
 }