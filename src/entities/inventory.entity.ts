import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { JobOrder } from "./joborder.entity";

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

    @ManyToMany(() => JobOrder, (jobOrder) => jobOrder.inventory) //Foreign
    jobOrder: JobOrder[];
}