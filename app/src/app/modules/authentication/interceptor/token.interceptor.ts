import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, switchMap, take, throwError } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";
import { Injectable } from "@angular/core";

@Injectable()
export class TokenHttpInterceptor implements HttpInterceptor {

    constructor(
        private readonly service: AuthenticationService
    ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.service.$token.pipe(
            take(1),
            switchMap((token) => {

                if(typeof token === "string") {
                    request = request.clone({
                        headers: request.headers.set('Authorization', `Bearer ${token}`)
                    });
                }

                return next.handle(request).pipe(
                    catchError((err: HttpErrorResponse, caught) => {
                        if(err && err.status == 401) {
                            this.service.logout();
                            return caught;
                        }
                        return throwError(() => err);
                    })
                );
            })
        );
    }

}