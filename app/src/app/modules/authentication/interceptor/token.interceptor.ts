import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, mergeMap, take, throwError } from "rxjs";
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
            mergeMap((token) => {
                console.log(token);

                request = request.clone({
                    headers: request.headers.set('Authorization', `Bearer ${token}`)
                });
    
                return next.handle(request).pipe(
                    // Handle 401 error
                    catchError((error: HttpErrorResponse) => {
                        if (error && error.status) {
                            if (error.status == 401) {
                                this.service.logout();
                            }

                            return null;
                        } else {
                            return throwError(() => error);
                        }
                    })
                )
            })
        );
    }

}