
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store';
import { Observable,Subscription } from 'rxjs/Rx';

@Injectable()
export class CacheStateService {

    subscription:Subscription;

    constructor(private observer:Observable<any>,private name:string){}

    saveState<T>(){

       this.subscription =  this.observer.subscribe((item:any) =>{
                console.log("Item from store : "+this.name,item);
            }  );
            
            
    }

    stop(){
        this.subscription.unsubscribe();
    }


}

