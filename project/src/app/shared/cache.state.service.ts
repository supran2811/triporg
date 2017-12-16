
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store';
import { Observable,Subscription } from 'rxjs/Rx';

@Injectable()
export class CacheStateService {

    subscription:Subscription;

    constructor(private observer:Observable<any>,private key:string){}

    saveState(){

       this.subscription =  this.observer.subscribe((item:any) =>{
                console.log("Item from store : "+this.key,item);
                localStorage.setItem(this.key,JSON.stringify(item));
            }  );
            
            
    }

    stop(){
        this.subscription.unsubscribe();
        console.log("[CacheStateService]","Removing item from cache with key "+this.key);
        localStorage.removeItem(this.key);
    }

}

export const getInitialState = (key:string) :any => {
    console.log(localStorage);
    const state = localStorage.getItem(key);
    console.log("[CacheStateService]",state);
    return state?JSON.parse(state):null ;
}

