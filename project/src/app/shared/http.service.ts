import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ErrorModel } from '../models/error.model';
@Injectable()
export class HttpService{
  
    constructor(private http:HttpClient){
    }

    get<T> (url:string,parameters:HttpParams){
        return this.http.get<T>(url,{
            params:parameters
        }).map( data => data).catch( (error:HttpErrorResponse)  => {
            const errorModel = new ErrorModel(error.status,error.statusText);
            return Observable.throw(errorModel);
        });
    }

    post<T> (url:string , data:any){
        return this.http.post(url,data).map(data => data).catch( (error:HttpErrorResponse) => {
            const errorModel = new ErrorModel(error.status,error.statusText);
            return Observable.throw(errorModel);
        }) ;
    }

    put (url:string , data:any){
        return this.http.put(url,data).map(data => data).catch( (error:HttpErrorResponse) => {
            const errorModel = new ErrorModel(error.status,error.statusText);
            return Observable.throw(errorModel);
        });
    }

    remove(url:string){
        return this.http.delete(url).map(data => data).catch( (error:HttpErrorResponse) => {
            const errorModel = new ErrorModel(error.status,error.statusText);
            return Observable.throw(errorModel);
        });
    }
}