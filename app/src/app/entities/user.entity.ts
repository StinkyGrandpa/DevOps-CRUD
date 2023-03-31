
export interface IUser {
    readonly id: string;
    enabled: boolean;
    firstName: string;
    lastName: string;
    age?: number;
}