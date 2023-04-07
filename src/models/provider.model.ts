import { IsString } from "class-validator";
import { IProduct } from "./product.model";

export class IProvider{
    @IsString()
    name: string;

    @IsString()
    company: string;

    @IsString()
    address: string;
    
    @IsString()
    email: string;

    @IsString()
    phonenumber: string;
    
    @IsString()
    status: string;

    product: IProduct;
}
