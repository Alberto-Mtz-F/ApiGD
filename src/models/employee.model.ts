import { IsString, IsDateString, IsEmail, IsNumberString, IsStrongPassword, IsNumber, IsArray } from "class-validator";
import { IUser } from "./user.model";

export class IEmployee{
    @IsString()
    name : string;

    @IsString()
    fristSurname : string;
    
    @IsString()
    secondSurname : string;
    
    @IsDateString()
    birthday: string;

    @IsEmail()
    email: string;

    @IsNumberString()
    phonenumber: string;

    @IsString()
    status: string;
    
    user:IUser // No se puede validar (Desde el Thunder Client al menos no logro apreciar como validar)
        
}