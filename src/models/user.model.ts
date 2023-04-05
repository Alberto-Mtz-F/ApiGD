import { IsEmail, IsNumber, IsString, IsStrongPassword, IsUUID } from 'class-validator';
import { IEmployee } from './employee.model';
export class IUser{
    @IsUUID()
    uuid: string;

    @IsEmail()
    email: string;
    
    @IsStrongPassword()
    password: string;

    @IsString()
    status: string;

    @IsNumber()
    role: number;

    @IsNumber()
    employee: number;
}