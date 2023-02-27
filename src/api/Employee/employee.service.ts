
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entities/employee.entity';
import { IEmployee } from 'src/models/employee.model';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService { 
    constructor(
        @InjectRepository(Employee) private employeeEntity : Repository<Employee>,
    ){}

    async create(employee: IEmployee){
       
        return await this.employeeEntity.insert(employee)
    }
}
