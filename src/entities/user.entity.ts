import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne} from 'typeorm';
import { Employee } from './employee.entity';
import { Role } from './role.entity';

@Entity()
export class User{

    //Keys
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    email : string;
    
    @Column()
    password : string;

    @Column()
    uuid: string; //Variable para aplicar 

    @Column()
    status : boolean;

    @ManyToOne(() => Role, (role) => role.user) //Foreign
    @JoinColumn({name:'role'})
    role: number;

    @OneToOne(() => Employee)
    @JoinColumn({name:'employee'})
    employee: number
    
}