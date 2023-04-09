import { IsEmail, IsNumberString, IsString } from "class-validator";

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

    @IsString()
    status: string;
    
}