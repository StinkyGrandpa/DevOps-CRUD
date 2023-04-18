import { inject } from "@angular/core";
import { CanMatchFn, Route, Router, UrlSegment } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { map, of, switchMap } from "rxjs";

const isAuthenticatedFn: CanMatchFn = (route: Route, url: UrlSegment[]) => {
    const isAuthUrl = url[0]?.path == "auth";

    if(isAuthUrl) {
        return of(true);
    }

    const service = inject(AuthenticationService);
    const router = inject(Router);

    return service.getToken().pipe(switchMap((token) => {
        if(typeof token === "undefined" || token == null) {
            router.navigate(["/auth", "login"]);
            return of(false);
        }

        return service.validateToken(token).pipe(map((isValid) => {
            if(isValid) return true;

            router.navigate(["/auth", "login"]);
            return false;
        }));
    }));
}

export {
    isAuthenticatedFn
};