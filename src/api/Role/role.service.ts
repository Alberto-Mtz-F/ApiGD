import { IRole } from './../../models/role.model';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private roleEntity : Repository<Role>
    ){}

    async create (role: IRole){
        return await this.roleEntity.insert(role);
    }

    getAll(){
        return this.roleEntity.find({
            relations:['user'],
        })
    }

    async getbyID(id_role: number){
        const roleExist = await this.roleEntity.findOne({where:{id:id_role}})
        this.validateRole(roleExist, id_role)
        return await this.roleEntity.findOne({
            relations:['user'],
            where:{id:id_role}
        })
    }
    
    async updateRolebyID(id: number, role: IRole){
        const roleExist = await this.roleEntity.findOne({where:{id:id}})
        this.validateRole(roleExist, id)
        
        return await this.roleEntity.update({id}, role)
    }

    async deleteRole(id: number){
        const userExist = await this.roleEntity.findOne({where:{id:id}})
        this.validateRole(userExist, id)


        console.log(userExist)
        //return await this.roleEntity.delete({id})
    }

    validateRole(userExist: Role, id_role: number){
        if(!userExist){
            console.error(`No se a encontrado al rol con id ${id_role}`)
        }
    }
}
