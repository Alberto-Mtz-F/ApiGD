import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Inventory{
   
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    quantity: number;
    
    @Column()
    spot: string;

    @OneToOne(() => Product)
    @JoinColumn({name:'product'})
    product: number;

    //order: number;
}