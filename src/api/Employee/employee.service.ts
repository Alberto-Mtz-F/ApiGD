
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

    /**
     * This function creates a new employee and user in a database and returns the result of creating
     * the user.
     * @param {IEmployee} employee - The employee parameter is an object that represents an employee.
     * It likely contains properties such as name, email, phone number, job title, and other relevant
     * information about the employee.
     * @returns The `create` function is returning the result of calling the `create` function of the
     * `userService` with the `usuario` object as its argument.
     */
    async create(employee: IEmployee){
        
        const response =  await this.employeeEntity.save(employee)
        const usuario: IUser = {
            uuid: employee.user.uuid,
            email: response.email,
            password: employee.user.password,
            status: response.status,        
            role: employee.user.role,
            employee: response.id
        }
        return this.userService.create(usuario)
    }

    /**
     * This function retrieves all employee entities with their related user and job order entities.
     * @returns The `getAll()` function is returning all the employee entities from the database, along
     * with their related user and job order entities.
     */
    getAll(){
        return this.employeeEntity.find({
            relations:['user', 'jobOrder'],
        })
    }

    /**
     * This function retrieves an employee by their ID, including their related user and job order
     * data, after validating their existence.
     * @param {number} id_employee - The parameter `id_employee` is a number that represents the unique
     * identifier of an employee. This function uses this parameter to find an employee in the database
     * and return their information along with their associated user and job order data.
     * @returns The function `getbyID` returns an employee object with its related user and jobOrder
     * objects, after validating that the employee exists in the database.
     */
    async getbyID(id_employee: number){
        const employeeExist = await this.employeeEntity.findOne({where:{id:id_employee}})
        this.validateEmployee(employeeExist, id_employee)
        return await this.employeeEntity.findOne({
            relations:['user', 'jobOrder'],
            where:{id:id_employee}
        })
    }
    
    /**
     * This function updates an employee's information by their ID in a database, after validating that
     * the employee exists.
     * @param {number} id - The ID of the employee to be updated in the database.
     * @param {IEmployee} employee - The `employee` parameter is an object of type `IEmployee` which
     * contains the updated information for an employee. It could include properties such as
     * `firstName`, `lastName`, `email`, `phone`, etc.
     * @returns The `updateEmployeebyID` function is returning a promise that resolves to the result of
     * updating the employee with the given `id` with the new `employee` data.
     */
    async updateEmployeebyID(id: number, employee: IEmployee){
        const employeeExist = await this.employeeEntity.findOne({where:{id:id}})
        this.validateEmployee(employeeExist, id)
        
        return await this.employeeEntity.update({id}, employee)
    }

    /**
     * This function deletes an employee and their associated user account if it exists.
     * @param {number} id - The ID of the employee that needs to be deleted.
     * @returns a Promise that resolves to a boolean value indicating whether the employee was
     * successfully deleted or not.
     */
    async deleteEmployee(id: number){
        const employeeExist = await this.getbyID(id)
        if (!employeeExist) return false

        await this.userService.deleteUser(employeeExist.user.id)
        return await this.employeeEntity.delete({id})
    }

    /**
     * This function validates if an employee exists based on their ID and logs an error message if
     * they do not.
     * @param {Employee} employeeExist - This parameter is of type `Employee` and represents the
     * employee object that is being checked for existence.
     * @param {number} id_employee - The id of the employee that needs to be validated.
     */
    validateEmployee(employeeExist: Employee, id_employee: number){
        if(!employeeExist){
            console.error(`No se a encontrado al empleado con id ${id_employee}`)
        }
    }
}
