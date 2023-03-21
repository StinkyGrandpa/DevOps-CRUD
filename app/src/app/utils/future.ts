
export class FutureError {
    constructor(
        public readonly statusCode?: number,
        public readonly message?: string,
        public readonly error?: string
    ){}
}

export class Future<T = any> {
    public readonly data?: T;
    public readonly loading: boolean = true;
    public readonly error?: FutureError;

    public static empty<T = any>(): Future<T> {
        return {
            loading: false,
            data: undefined,
            error: undefined
        }
    }

    public static notfound<T = any>(message?: string, statusCode?: number, errCode?: string): Future<T> {
        return this.error(message ?? "Not Found.", statusCode ?? 404, errCode ?? "NOT_FOUND");
    }

    public static error<T = any>(message: string, statusCode: number, errCode?: string): Future<T> {
        return {
            loading: false,
            data: undefined,
            error: {
                statusCode: statusCode,
                message: message,
                error: errCode ?? "INTERNAL_CLIENT_ERROR"
            }
        }
    }

    public static loading<T = any>(): Future<T> {
        return {
            loading: true
        }
    }

    public static merge<D = any>(dst: Future<D>, src: D): Future<D> {
        return {
            loading: dst.loading,
            error: dst.error,
            data: {
                ...dst.data ?? {} as D,
                ...src ?? {} as D
            }
        }
    }
}

export function apiResponse() {
    return function<T>(source: Observable<T>) {
        return source.pipe(
            catchError((err: HttpErrorResponse) => {
                return of(err)
            }),
            map((result: T | HttpErrorResponse) => {
                if(result instanceof HttpErrorResponse) {
                    return new ApiResponse<T>(null, result);
                }

                return new ApiResponse<T>(result);
            })
        );
    }
}

export class ApiResponse<T> {

    constructor(
        public readonly payload: T | null,
        private readonly _error?: HttpErrorResponse
    ) { }

    public get error() {
        if(typeof this._error == "undefined" || this._error == null) return null;
        return new FutureError(
            this._error?.status,
            this._error?.error?.["message"],
            this._error?.error?.["error"]
        );
    }

    public get message() {
        return this.error?.message;
    }

    public get status() {
        return this._error?.status || 200;
    }

}

import { HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, of, Subscriber } from "rxjs";

/**
 * RxJS Operator that transforms an observable
 * into a Future<T>
 */
export function toFuture() {
    return function<T>(source: Observable<T>) {
        return new Observable((subscriber: Subscriber<Future<T>>) => {
            // Subscribe to source observable
            const sourceSubscription = source.pipe(apiResponse()).subscribe((response) => {
                // Push new future to subscriber
                subscriber.next({
                    loading: false,
                    data: response.payload as any,
                    error: response.error as FutureError
                });
                // Complete subscription as it is completed
                subscriber.complete();
            });

            // Push initial future with loading set to true
            subscriber.next({ loading: true });
            // Add subscription of request so it gets unsubscribed if the main sub
            // gets unsubscribed
            subscriber.add(sourceSubscription);
        });
    }
}

/**
 * RxJS Operator that transforms an observable providing ApiResponse<T>
 * into a Future<T>
 */
export function toFutureCompat() {
    return function<T>(source: Observable<ApiResponse<T>>) {
        return new Observable((subscriber: Subscriber<Future<T>>) => {
            // Subscribe to source observable
            const sourceSubscription = source.subscribe((response) => {
                // Push new future to subscriber
                subscriber.next({
                    loading: false,
                    data: response.payload as any,
                    error: response.error as FutureError
                });
                // Complete subscription as it is completed
                subscriber.complete();
            });

            // Push initial future with loading set to true
            subscriber.next({ loading: true });
            // Add subscription of request so it gets unsubscribed if the main sub
            // gets unsubscribed
            subscriber.add(sourceSubscription);
        });
    }
}