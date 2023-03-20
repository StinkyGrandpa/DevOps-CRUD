
export interface IUser {
    readonly id: string;
    readonly enabled: boolean;
    firstName: string;
    lastName: string;
    age?: number;
}