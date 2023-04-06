import { IProduct } from "./product.model";

export interface IProvider{
    name: string;
    
    company: string;

    address: string;
    
    email: string;

    phonenumber: string;
    
    status: string;

    product: IProduct;
}
