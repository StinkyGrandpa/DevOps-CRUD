import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, switchMap, take } from "rxjs";
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
                // Check if token is a valid string
                if(typeof token === "string") {
                    // If true, set Authorization header
                    request = request.clone({
                        headers: request.headers.set('Authorization', `Bearer ${token}`)
                    });
                }

                // Execute request
                return next.handle(request);
            })
        );
    }

}