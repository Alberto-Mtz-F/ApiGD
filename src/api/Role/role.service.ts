import { IRole } from './../../models/role.model';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';
import { UserService } from '../User/user.service';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private roleEntity : Repository<Role>,
        private userService: UserService
    ){}

    /**
     * This function creates a new role entity in a database using the provided role object.
     * @param {IRole} role - IRole is likely an interface or type that defines the shape of an object
     * representing a role in the system. It could include properties such as the name of the role, its
     * permissions, and any other relevant information. The `create` function appears to be an
     * asynchronous method that takes in an object of
     * @returns The `create` method is returning a Promise that resolves to the result of inserting the
     * `role` object into the `roleEntity`. The result could be the newly created `role` object or some
     * other value depending on the implementation of the `insert` method.
     */
    async create (role: IRole){
        return await this.roleEntity.insert(role);
    }

    /**
     * This function returns all role entities with their associated user entities.
     * @returns The `getAll()` function is returning an array of `roleEntity` objects with their
     * associated `user` objects included as a relation.
     */
    getAll(){
        return this.roleEntity.find({
            relations:['user'],
        })
    }

    /**
     * This function retrieves a role by its ID and validates its existence before returning it along
     * with its associated users.
     * @param {number} id_role - The parameter `id_role` is a number that represents the ID of a role
     * that we want to retrieve from the database.
     * @returns The function `getbyID` returns a Promise that resolves to a single `Role` entity with
     * its associated `User` entities, based on the provided `id_role` parameter. Before returning the
     * entity, the function first checks if the `Role` entity exists and validates it using the
     * `validateRole` function.
     */
    async getbyID(id_role: number){
        const roleExist = await this.roleEntity.findOne({where:{id:id_role}})
        this.validateRole(roleExist, id_role)
        return await this.roleEntity.findOne({
            relations:['user'],
            where:{id:id_role}
        })
    }
    
    /**
     * This function updates a role by its ID in a database using TypeScript.
     * @param {number} id - The ID of the role that needs to be updated in the database.
     * @param {IRole} role - The `role` parameter is an object of type `IRole` which contains
     * information about the role that needs to be updated. It is passed as an argument to the
     * `updateRolebyID` function.
     * @returns The `updateRolebyID` function is returning a promise that resolves to the result of
     * updating the role with the specified `id` with the new `role` object.
     */
    async updateRolebyID(id: number, role: IRole){
        const roleExist = await this.roleEntity.findOne({where:{id:id}})
        this.validateRole(roleExist, id)
        
        return await this.roleEntity.update({id}, role)
    }

    /**
     * This function deletes a role by its ID and also deletes all users associated with that role.
     * @param {number} id - The ID of the role that needs to be deleted.
     * @returns a Promise that resolves to the result of deleting a role with the specified ID from the
     * database. If the role does not exist, it returns false. Before deleting the role, it also
     * deletes all users associated with that role.
     */
    async deleteRole(id: number){
        const roleExist = await this.getbyID(id)
        if(!roleExist) return false
        await this.deleteusers(roleExist)
        return await this.roleEntity.delete({id})
    }

    /**
     * This function deletes all users associated with a given role.
     * @param {Role} roleExist - Role object that contains information about a specific role, including
     * the users assigned to that role.
     */
    async deleteusers(roleExist: Role){
        let user = roleExist.user
        for (let index = 0; index < user.length; index++) {
            await this.userService.deleteUser(user[index].id)
        }
    }

    /**
     * This function validates if a role exists based on its ID and logs an error message if it
     * doesn't.
     * @param {Role} roleExist - A variable that represents whether a role exists or not. It is likely
     * a boolean value.
     * @param {number} id_role - The id of the role that needs to be validated.
     */
    validateRole(roleExist: Role, id_role: number){
        if(!roleExist){
            console.error(`No se a encontrado al rol con id ${id_role}`)
        }
    }
}
