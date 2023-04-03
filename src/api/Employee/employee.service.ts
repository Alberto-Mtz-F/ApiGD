
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entities/employee.entity';
import { IEmployee } from 'src/models/employee.model';
import { IUser } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { UserService } from '../User/user.service';

@Injectable()
export class EmployeeService { 
    constructor(
        @InjectRepository(Employee) private employeeEntity : Repository<Employee>,
        private userEntity :UserService
    ){}

    async create(employee: IEmployee){
        let demomento : string
        const response =  await this.employeeEntity.save(employee)
        const usuario: IUser = {
            uuid: demomento,
            email: response.email,
            password: employee.user.password,
            status: response.status,        
            role: employee.user.role,
            employee: response.id
        }
        return this.userEntity.create(usuario)
    }

    async createwhitUser(employee: IEmployee){
       
        return await this.employeeEntity.insert(employee)
    }
}
