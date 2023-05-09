import { IsBoolean, IsEmail, IsString } from "class-validator";
import { IProduct } from "./product.model";

export class IProvider{
    @IsString()
    name: string;

    @IsString()
    company: string;

    @IsString()
    address: string;
    
    @IsEmail()
    email: string;

    @IsString()
    phonenumber: string;
    
    @IsBoolean()
    status: boolean;

    product: IProduct;
}
