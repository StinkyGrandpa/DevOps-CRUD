import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { toFuture } from "src/app/utils/future";
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable, filter, map, tap } from "rxjs";
import Cookies from 'js-cookie'
import { Router } from "@angular/router";

export const AUTH_COOKIE_NAME = "__auth_token__";

@Injectable({
    providedIn: "root"
})
export class AuthenticationService {

    private readonly _tokenSubject: BehaviorSubject<string> = new BehaviorSubject(null);
    public readonly $token = this._tokenSubject.asObservable();

    constructor(
        private readonly router: Router,
        private readonly httpClient: HttpClient
    ) {}

    public login(username: string, password: string) {
        return this.httpClient.post<string>(`${environment.api_base_url}/auth/login`, {
            username: username,
            password: password
        }).pipe(
            toFuture(),
            tap((request) => {
                if(request.loading || request.error) return;
                this.setToken(request.data);
            })
        );
    }

    public logout() {
        this.setToken(null);
        this.router.navigate(["/auth", "login"]);
    }

    public validateToken(token: string) {
        const params = new URLSearchParams();
        params.set("token", token);

        return this.httpClient.get<boolean>(`${environment.api_base_url}/auth/validate?${params.toString()}`).pipe(
            toFuture(), 
            filter((request) => !request.loading),
            map((request) => {
                return !request.error;
            }),
            tap((isValid) => this.setToken(isValid ? token : null))
        );
    }

    public getToken() {
        return new Observable<string>((subscriber) => {
            subscriber.next(Cookies.get(AUTH_COOKIE_NAME));
            subscriber.complete();
        });
    }

    public setToken(token?: string) {
        this.setCookie(token);
        this._tokenSubject.next(token);
    }

    private setCookie(token: string) {
        if(typeof token === "undefined" || token == null) {
            Cookies.remove(AUTH_COOKIE_NAME)
            return;
        }
        Cookies.set(AUTH_COOKIE_NAME, token, { expires: Date.now() + 1000*60*60*24 });
    }

}