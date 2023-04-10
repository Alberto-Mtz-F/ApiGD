import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Inventory } from "./inventory.entity";
import { Customer } from "./customer.entity";
import { Employee } from "./employee.entity";

@Entity()
export class JobOrder{
    
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    quantity: number;

    @ManyToMany(() => Inventory, (inventory) => inventory.jobOrder )
    @JoinTable({
        name: 'jobOrder_inventory',
        joinColumn:{
            name:'id_jobOrder',
        },
        inverseJoinColumn: {
            name: 'id_inventory',
        }
    })
    inventory: Inventory[]; 

    @ManyToOne(() => Customer, (customer) => customer.jobOrder)
    @JoinColumn({name:'customer'})
    customer: number;

    @ManyToOne(() => Employee, (employee) => employee.jobOrder)
    @JoinColumn({name:'employee'})
    employee: number;

}