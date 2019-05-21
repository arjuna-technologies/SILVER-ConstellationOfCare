import { Injectable }                                           from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthenticationService }                                from './authentication.service';
import { Observable }                                           from 'rxjs';

@Injectable()
export class AuthenticationTokenInterceptor implements HttpInterceptor
{
    public constructor(public authenticationService: AuthenticationService)
    {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        request = request.clone({
            setHeaders:
            {
                Authorization: `Bearer ${this.authenticationService.getToken()}`
            }
        });

        return next.handle(request);
    }
}
