import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { IUser } from "../entities/user.entity";
import { environment } from "src/environments/environment";
import { Future, toFuture } from "../utils/future";

@Injectable()
export class UserService {

    constructor(
        private readonly httpClient: HttpClient
    ) {}

    public findById(id: string): Observable<Future<IUser>> {
        return this.httpClient.get<IUser>(`${environment.api_base_url}/users/${id}`).pipe(toFuture());
    }

    public createUser(data: Partial<IUser>): Observable<Future<IUser>> {
        return this.httpClient.post<IUser>(`${environment.api_base_url}/users`, data).pipe(toFuture());
    }

    public deleteById(id: string): Observable<Future<boolean>> {
        return this.httpClient.delete<boolean>(`${environment.api_base_url}/users/${id}`).pipe(toFuture());
    }

    public updateUser(id: string, data: Partial<Omit<IUser, "id">>): Observable<Future<IUser>> {
        return this.httpClient.put<IUser>(`${environment.api_base_url}/users/${id}`, data).pipe(toFuture());
    }

    public findAll(): Observable<Future<IUser[]>> {
        return this.httpClient.get<IUser[]>(`${environment.api_base_url}/users`).pipe(toFuture());
    }

}