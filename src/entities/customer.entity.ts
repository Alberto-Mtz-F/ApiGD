import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JobOrder } from "./joborder.entity";

@Entity()
export class Customer{
    
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    fristSurname : string;

    @Column()
    secondSurname : string;

    @Column()
    email: string;

    @Column()
    phonenumber: string;

    @Column()
    status: boolean;
    
    @OneToMany(() => JobOrder , (jobOrder) => jobOrder.customer)
    jobOrder: JobOrder[]

}