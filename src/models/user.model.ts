import { IsBoolean, IsEmail, IsNumber, IsString, IsStrongPassword, IsUUID } from 'class-validator';
import { IEmployee } from './employee.model';
export class IUser{
    @IsString()
    uuid: string;

    @IsEmail()
    email: string;
    
    @IsStrongPassword()
    password: string;

    @IsBoolean()
    status: boolean;

    @IsNumber()
    role: number;

    @IsNumber()
    employee: number;
}