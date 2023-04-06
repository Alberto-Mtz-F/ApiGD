import { IInventory } from "./inventory.model";

export interface IProduct{
    name: string;
    
    description: string;

    brand: string;
    
    image: string;

    inventory: IInventory

    provider: number;
}
