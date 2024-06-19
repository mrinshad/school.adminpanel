import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { AuthService } from '@shared';

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
    public constructor(private readonly authService: AuthService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): import('rxjs').Observable<HttpEvent<any>> {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authService.getToken()}`,
            },
        });

        return next.handle(authReq);
    }
}
