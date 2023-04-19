import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { toFuture } from "src/app/utils/future";
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable, filter, map, tap } from "rxjs";
import Cookies from 'js-cookie'
import { Router } from "@angular/router";
import { JWTResponse } from "../entities/jwt.entity";
import { User } from "../entities/user.entity";

export const AUTH_COOKIE_NAME = "__auth_token__";
export const AUTH_COOKIE_EXPIRES = 1; // One day

@Injectable({
    providedIn: "root"
})
export class AuthenticationService {

    private readonly _tokenSubject: BehaviorSubject<string> = new BehaviorSubject(this.readCookieSync());
    public readonly $token = this._tokenSubject.asObservable();

    public readonly $user = this.$token.pipe(map((token) => {
        if(typeof token !== "string") {
            return null;
        }

        return this.parseJwt(token);
    }));

    constructor(
        private readonly router: Router,
        private readonly httpClient: HttpClient
    ) {}

    public login(username: string, password: string) {
        return this.httpClient.post<JWTResponse>(`${environment.api_base_url}/auth/login`, {
            username: username,
            password: password
        }).pipe(
            toFuture(),
            tap((request) => {
                if(request.loading || request.error) return;
                this.setToken(request.data?.token);
            })
        );
    }

    public logout() {
        this.setToken(null);
        this.router.navigate(["/auth", "login"]);
    }

    public validateToken(token?: string) {
        return this.httpClient.get<boolean>(`${environment.api_base_url}/auth/validate`).pipe(
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
            subscriber.next(this.readCookieSync());
            subscriber.complete();
        });
    }

    private readCookieSync() {
        return Cookies.get(AUTH_COOKIE_NAME);
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
        Cookies.set(AUTH_COOKIE_NAME, token, { expires: AUTH_COOKIE_EXPIRES });
    }

    private parseJwt (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload) as User;
    }

}