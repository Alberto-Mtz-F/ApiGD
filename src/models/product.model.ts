import { IsNumber, IsString } from "class-validator";
import { IInventory } from "./inventory.model";

export class IProduct{
    @IsString()
    name: string;
    
    @IsString()
    description: string;

    @IsString()
    brand: string;
    
    @IsString()
    image: string;

    inventory: IInventory

    @IsNumber()
    provider: number;
}
