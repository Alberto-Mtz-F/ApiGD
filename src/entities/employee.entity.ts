import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany} from 'typeorm';
import { User } from './user.entity';
import { JobOrder } from './joborder.entity';

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
    user: User

    @OneToMany(() => JobOrder, (jobOrder) => jobOrder.employee)
    jobOrder: JobOrder[]
    
}