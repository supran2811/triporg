import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class HttpService{
  
    constructor(private http:HttpClient){}

    get<T> (url:string,parameters:HttpParams){
        return this.http.get<T>(url,{
            params:parameters
        }).map( data => {
            return data;
        });
    }
}