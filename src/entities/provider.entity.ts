import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Provider{
   
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name: string;
    
    @Column()
    company: string;

    @Column()
    address: string;
    
    @Column()
    email: string;

    @Column()
    phonenumber: string;
    
    @Column()
    status: string;

    @OneToMany(() => Product, (product) => product.provider )
    product: Product[];
    

}