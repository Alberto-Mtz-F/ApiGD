
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
        private userService :UserService
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
        return this.userService.create(usuario)
    }

    getAll(){
        return this.employeeEntity.find({
            relations:{user:true},
        })
    }

    async getbyID(id_employee: number){
        const employeeExist = await this.employeeEntity.findOne({where:{id:id_employee}})
        this.validateUser(employeeExist, id_employee)
        return await this.employeeEntity.findOne({
            relations:{user:true},
            where:{id:id_employee}
        })
    }
    
    async updateEmployeebyID(id: number, employee: IEmployee){
        const employeeExist = await this.employeeEntity.findOne({where:{id:id}})
        this.validateUser(employeeExist, id)
        
        return await this.employeeEntity.update({id}, employee)
    }

    async deleteEmployee(id: number){
        const employeeExist = await this.employeeEntity.findOne({where:{id:id}})
        this.validateUser(employeeExist, id)
        return await this.employeeEntity.delete({id})
    }

    validateUser(employeeExist: Employee, id_employee: number){
        if(!employeeExist){
            console.error(`No se a encontrado al empleado con id ${id_employee}`)
        }
    }
}
