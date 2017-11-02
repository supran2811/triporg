import { Observable } from 'rxjs/Rx';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

export class HttpAuthInterceptor implements HttpInterceptor{
    
    intercept(req:HttpRequest<any> , next:HttpHandler) : Observable<HttpEvent<any>>{
        return next.handle(req);
    }
}