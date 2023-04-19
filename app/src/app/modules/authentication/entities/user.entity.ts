
export interface User {
    readonly id: string;
    enabled: boolean;
    firstName: string;
    lastName: string;
    age?: number;
    username?: string;
    readonly updatedAt?: number;
}