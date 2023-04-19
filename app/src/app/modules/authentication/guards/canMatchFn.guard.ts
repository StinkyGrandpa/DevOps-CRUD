import { inject } from "@angular/core";
import { CanMatchFn, Route, Router, UrlSegment } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { map, of, switchMap, take } from "rxjs";

const isAuthenticatedFn: CanMatchFn = (route: Route, url: UrlSegment[]) => {
    const isAuthUrl = url[0]?.path == "auth";

    if(isAuthUrl) {
        return of(true);
    }

    const service = inject(AuthenticationService);
    const router = inject(Router);

    return service.$token.pipe(take(1), switchMap((token) => {
        // Check if there is a valid token
        if(typeof token === "undefined" || token == null) {
            console.log("no token found, navigating to login page");
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