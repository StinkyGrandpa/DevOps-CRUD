import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Future, toFuture } from "../utils/future";
import { User } from "../modules/authentication/entities/user.entity";

@Injectable()
export class UserService {

    constructor(
        private readonly httpClient: HttpClient
    ) { }

    public findById(id: string): Observable<Future<User>> {
        return this.httpClient.get<User>(`${environment.api_base_url}/users/${id}`).pipe(toFuture());
    }

    public createUser(data: Partial<User>): Observable<Future<User>> {
        return this.httpClient.post<User>(`${environment.api_base_url}/users`, data).pipe(toFuture());
    }

    public deleteById(id: string): Observable<Future<boolean>> {
        return this.httpClient.delete<boolean>(`${environment.api_base_url}/users/${id}`).pipe(toFuture());
    }

    public updateUser(id: string, data: Partial<Omit<User, "id">>): Observable<Future<User>> {
        return this.httpClient.put<User>(`${environment.api_base_url}/users/${id}`, data).pipe(toFuture());
    }

    public findAll(): Observable<Future<User[]>> {
        return this.httpClient.get<User[]>(`${environment.api_base_url}/users`).pipe(toFuture());
    }

    public lockById(id: string) {
        return this.httpClient.put(`${environment.api_base_url}/users/${id}/lock`, {}).pipe(toFuture());
    }

    public unlockById(id: string) {
        return this.httpClient.put(`${environment.api_base_url}/users/${id}/unlock`, {}).pipe(toFuture());
    }


}