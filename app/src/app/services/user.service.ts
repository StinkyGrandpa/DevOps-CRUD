import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { IUser } from "../entities/user.entity";
import { environment } from "src/environments/environment";

@Injectable()
export class UserService {

    constructor(
        private readonly httpClient: HttpClient
    ) {}

    public findById(id: string): Observable<IUser> {
        return this.httpClient.get<IUser>(`${environment.api_base_url}/users/${id}`);
    }

    public createUser(data: Partial<IUser>): Observable<IUser> {
        return this.httpClient.post<IUser>(`${environment.api_base_url}/users`, data);
    }

    public deleteById(id: string): Observable<boolean> {
        return this.httpClient.delete<boolean>(`${environment.api_base_url}/users/${id}`);
    }

    public updateUser(id: string, data: Partial<Omit<IUser, "id">>): Observable<IUser> {
        return this.httpClient.put<IUser>(`${environment.api_base_url}/users/${id}`, data);
    }

}