import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class APIKeyHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modified = req.clone({setHeaders: {'X-API-Key': '7863bb91-d308-4e63-97ff-db4c49fbe61b'}});
        return next.handle(modified);
    }
}
