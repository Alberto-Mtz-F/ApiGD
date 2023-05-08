
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

    /**
     * This function creates a new user in the database after checking if the role and employee exist
     * and if the employee already has a user associated with them.
     * @param {IUser} user - an object representing a user to be created, with properties such as name,
     * email, password, role, and employee.
     * @returns the result of the `insert` method of the `userEntity` object, which is likely a Promise
     * that resolves to the newly created user object. However, if any of the conditions in the
     * function are not met, it will return an error message using `console.error` instead of the user
     * object.
     */
    async create(user: IUser){
        const rolexist = await this.roleEntity.findOne({where:{id: user.role}})
        if (!rolexist) return console.error(`No existe rol con id ${user.role}`)
        
        const employeeexist = await this.employeeEntity.findOne({relations: ['user'], where:{id: user.employee}})
        if (!employeeexist) return console.error(`No existe el empleado con id ${user.employee}`)
        if (employeeexist.user) return console.error(`Ya existe un usuario para el empleado con id ${user.employee}`)
        return await this.userEntity.insert(user)
    }

    /**
     * This function retrieves all user entities with their related role and employee entities.
     * @returns The `getAll()` function is returning all the user entities from the database along with
     * their related `role` and `employee` entities.
     */
    getAll(){
        return this.userEntity.find({relations: ['role', 'employee']})
    }

    /**
     * This function retrieves a user by their ID, including their role and employee relations, after
     * validating their existence.
     * @param {number} id_user - The parameter `id_user` is a number that represents the unique
     * identifier of a user in the database. This function uses this parameter to find a user in the
     * database and return their information along with their associated role and employee data.
     * @returns The function `getbyID` returns a Promise that resolves to a user object with its
     * related role and employee data, if a user with the specified `id_user` exists in the database.
     * Before returning the user object, the function first validates if the user exists by calling the
     * `validateUser` function.
     */
    async getbyID(id_user: number){
        const userExist = await this.userEntity.findOne({where:{id:id_user}})
        this.validateUser(userExist, id_user)
        return await this.userEntity.findOne({
            relations: ['role', 'employee'],
            where: {id: id_user}
            
        })
    }

    /**
     * This function retrieves a user by their UUID and returns their information along with their
     * associated role and employee data.
     * @param {string} uuid_user - The parameter `uuid_user` is a string that represents the UUID
     * (Universally Unique Identifier) of a user. It is used to search for a user in the database and
     * retrieve their information, including their role and employee details.
     * @returns a user entity with its related role and employee entities, based on the provided UUID.
     * Before returning the user entity, the function first checks if the user exists and is valid.
     */
    async getbyUUID(uuid_user: string){
        const userExist = await this.userEntity.findOne({where:{uuid:uuid_user}})
        this.validateUser(userExist, userExist.id)
        return await this.userEntity.findOne({
            relations: ['role', 'employee'],
            where: {uuid: uuid_user}
            
        })
    }
    
    /**
     * This function updates a user by their ID after validating their existence.
     * @param {number} id - The ID of the user that needs to be updated in the database.
     * @param {IUser} user - IUser is likely an interface or type definition for a user object, which
     * may include properties such as name, email, password, and other relevant information. This
     * parameter is used to update an existing user in the database with the provided information.
     * @returns The `updateUserbyID` function is returning a Promise that resolves to the result of
     * updating the user with the given `id` with the properties of the `user` object.
     */
    async updateUserbyID(id: number, user: IUser){
        const userExist = await this.userEntity.findOne({where:{id:id}})
        this.validateUser(userExist, id)
        
        return await this.userEntity.update({id}, user)
    }

    /**
     * This is an asynchronous function that deletes a user by their ID if they exist.
     * @param {number} id - The id parameter is a number that represents the unique identifier of the
     * user that needs to be deleted.
     * @returns The `deleteUser` function is returning a Promise that resolves to either `false` if the
     * user with the given `id` does not exist, or the result of deleting the user with the given `id`
     * from the `userEntity`.
     */
    async deleteUser(id: number){
        const userExist = await this.getbyID(id)
        if(!userExist) return false

        return await this.userEntity.delete({id})
    }

    /**
     * The function validates if a user exists and logs an error message if not.
     * @param {User} userExist - A variable that represents whether a user exists or not. It is likely
     * a boolean value.
     * @param {number} id_user - The id of the user that needs to be validated.
     */
    validateUser(userExist: User, id_user: number){
        if(!userExist){
            console.error(`No se a encontrado al usuario con id ${id_user}`)
        }
    }

}
