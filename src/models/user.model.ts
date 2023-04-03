import { IEmployee } from './employee.model';
export interface IUser{
    uuid: string;

    email: string;
    
    password: string;

    status: string;

    role: number;

    employee: number;
}