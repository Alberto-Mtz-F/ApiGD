import { IsNumber, IsString } from "class-validator";

export class IInventory{
    @IsNumber()
    quantity: number;
    
    @IsString()
    spot: string;

    @IsNumber()
    product: number;

    //order: number;
    
}
    