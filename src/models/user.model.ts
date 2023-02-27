import { IEmployee } from './employee.model';
export interface IUser{
    email: string;
    
    password: string;

    status: string;

    role: number;

    employee: number;
}