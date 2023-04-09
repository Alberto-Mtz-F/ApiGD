import { IInventory } from "./inventory.model";

export interface IJobOrder{

    quantity: number;
    
    customer: number;

    employee: number;

    inventory: IInventory[];
}