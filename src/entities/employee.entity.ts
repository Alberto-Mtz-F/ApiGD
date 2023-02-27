import { Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Employee{
    
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    fristSurname : string;

    @Column()
    secondSurname : string;
    
    @Column()
    birthday: string;;

    @Column()
    email: string;

    @Column()
    phonenumber: string;

    @Column()
    status: string;

    @OneToOne(() => User , (user) => user.employee)
    user: number

}