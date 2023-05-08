import { IsBoolean, IsEmail, IsNumberString, IsString } from "class-validator";

export class ICustomer{

    @IsString()
    name: string;

    @IsString()
    fristSurname : string;

    @IsString()
    secondSurname : string;

    @IsEmail()
    email: string;

    @IsNumberString()
    phonenumber: string;

    @IsBoolean()
    status: boolean;
    
}