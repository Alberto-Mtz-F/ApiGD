
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { IUser } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { EmployeeService } from '../Employee/employee.service';

@Injectable()
export class UserService { 
    constructor(
        @InjectRepository(User) private userEntity : Repository<User>,
    ){}

    async create(user: IUser){
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
