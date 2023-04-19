
export interface User {
    readonly id: string;
    enabled: boolean;
    firstName: string;
    lastName: string;
    age?: number;
    username: string;
    password?: string;
    readonly updatedAt?: number;
}