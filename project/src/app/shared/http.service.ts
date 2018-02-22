import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ErrorModel } from '../models/error.model';
@Injectable()
export class HttpService{
  
    constructor(private http:HttpClient){
    }

    get<T> (url:string,parameters:HttpParams){
        console.log("Inside sending get request!!!!!");
        return this.http.get<T>(url,{
            params:parameters
        }).map( data => {
            console.log("[HttpService]","Getting data",data);

            return data;

        }).catch( (error:HttpErrorResponse)  => {
            console.log("[HttpService] Gettng error ",error);

            const errorModel = new ErrorModel(error.status,error.statusText);

            return Observable.throw(errorModel);
        });;
    }

    post<T> (url:string , data:any){
        return this.http.post(url,data);
    }

    put (url:string , data:any){
        return this.http.put(url,data);
    }

    remove(url:string){
        return this.http.delete(url);
    }
}