import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Inventory } from "./inventory.entity";
import { Provider } from './provider.entity';

@Entity()
export class Product{
   
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name: string;
    
    @Column()
    description: string;

    @Column()
    brand: string;
    
    @Column()
    image: string;

    @OneToOne(() => Inventory , (inventory) => inventory.product)
    inventory: Inventory

    @ManyToOne(() => Provider, (provider) => provider.product) //Foreign
    @JoinColumn({name:'provider'})
    provider: number;

}