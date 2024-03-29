import { IsBoolean, IsNumber } from "class-validator";
import { IInventory } from "./inventory.model";

export class IJobOrder{
    @IsNumber()
    quantity: number;
    
    @IsNumber()
    customer: number;

    @IsNumber()
    employee: number;

    @IsBoolean()
    status: boolean;

    inventory: IInventory[];
}