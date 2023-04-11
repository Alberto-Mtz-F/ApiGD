
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { IUser } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/role.entity';
import { Employee } from 'src/entities/employee.entity';

@Injectable()
export class UserService { 
    constructor(
        @InjectRepository(User) private userEntity : Repository<User>,
        @InjectRepository(Role) private roleEntity : Repository<Role>,
        @InjectRepository(Employee) private employeeEntity : Repository<Employee>,

        
    ){}

    async create(user: IUser){
        const rolexist = await this.roleEntity.findOne({where:{id: user.role}})
        if (!rolexist) return console.error(`No existe rol con id ${user.role}`)
        
        const employeeexist = await this.employeeEntity.findOne({relations: ['user'], where:{id: user.employee}})
        if (!employeeexist) return console.error(`No existe el empleado con id ${user.employee}`)
        if (employeeexist.user) return console.error(`Ya existe un usuario para el empleado con id ${user.employee}`)
        return await this.userEntity.insert(user)
    }

    getAll(){
        return this.userEntity.find({relations: ['role', 'employee']})
    }

    async getbyID(id_user: number){
        const userExist = await this.userEntity.findOne({where:{id:id_user}})
        this.validateUser(userExist, id_user)
        return await this.userEntity.findOne({
            relations: ['role', 'employee'],
            where: {id: id_user}
            
        })
    }
    
    async updateUserbyID(id: number, user: IUser){
        const userExist = await this.userEntity.findOne({where:{id:id}})
        this.validateUser(userExist, id)
        
        return await this.userEntity.update({id}, user)
    }

    async deleteUser(id: number){
        const userExist = await this.getbyID(id)
        if(!userExist) return false

        return await this.userEntity.delete({id})
    }

    validateUser(userExist: User, id_user: number){
        if(!userExist){
            console.error(`No se a encontrado al usuario con id ${id_user}`)
        }
    }

}
