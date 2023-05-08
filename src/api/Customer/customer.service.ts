import { JobOrderService } from './../JobOrder/joborder.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entities/customer.entity';
import { ICustomer } from 'src/models/customer.model';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService { 
    constructor(
        @InjectRepository(Customer) private customerEntity : Repository<Customer>,
        private jobOrderService : JobOrderService

    ){}

    /**
     * This is an async function that creates a new customer entity and inserts it into the database.
     * @param {ICustomer} customer - ICustomer - This is the parameter for the create method and it
     * represents an object of type ICustomer which contains the details of the customer that needs to
     * be created. The method inserts this object into the customerEntity. The "async" keyword
     * indicates that this method is asynchronous and will return a Promise.
     * @returns The `create` method is returning a Promise that resolves to the result of inserting the
     * `customer` object into the `customerEntity`.
     */
    async create (customer: ICustomer){
        return await this.customerEntity.insert(customer);
    }

    /**
     * This function returns all customer entities with their related job orders.
     * @returns The `getAll()` function is returning an array of customer entities that have a relation
     * to the `jobOrder` entity.
     */
    getAll(){
        return this.customerEntity.find({
            relations:['jobOrder'],
        })
    }

    /**
     * This function retrieves a customer and their associated job orders by their ID, after validating
     * that the customer exists.
     * @param {number} id_customer - The parameter `id_customer` is a number that represents the unique
     * identifier of a customer in a database. This function uses this parameter to find a customer
     * entity in the database and return it along with its related job orders.
     * @returns The function `getbyID` returns a Promise that resolves to a customer object with its
     * related job orders, if a customer with the specified `id_customer` exists in the database. If
     * the customer does not exist, the function throws an error.
     */
    async getbyID(id_customer: number){
        const customerExist = await this.customerEntity.findOne({where:{id:id_customer}})
        this.validateCustomer(customerExist, id_customer)
        return await this.customerEntity.findOne({
            relations:['jobOrder'],
            where:{id:id_customer}
        })
    }
    
    /**
     * This function updates a customer's information by their ID.
     * @param {number} id - The ID of the customer to be updated in the database.
     * @param {ICustomer} customer - ICustomer is likely an interface or type definition for the shape
     * of a customer object. It probably includes properties such as name, email, phone number,
     * address, etc. This parameter is used to update the existing customer with new information.
     * @returns The `updateCustomerbyID` function is returning a promise that resolves to the result of
     * updating the customer with the specified `id` with the new `customer` data.
     */
    async updateCustomerbyID(id: number, customer: ICustomer){
        const customerExist = await this.customerEntity.findOne({where:{id:id}})
        this.validateCustomer(customerExist, id)
        
        return await this.customerEntity.update({id}, customer)
    }

    /**
     * This function deletes a customer and their associated job orders if they exist.
     * @param {number} id - The ID of the customer that needs to be deleted.
     * @returns a Promise that resolves to either `false` if the customer with the given `id` does not
     * exist, or the result of deleting the customer with the given `id` from the database using the
     * `customerEntity.delete()` method.
     */
    async deleteCustomer(id: number){
        const customerExist = await this.getbyID(id)
        if (!customerExist) return false
        await this.deleteJobOrders(customerExist)
        return await this.customerEntity.delete({id})
    }

    /**
     * This function deletes all job orders associated with a given customer.
     * @param {Customer} customerExist - The parameter `customerExist` is of type `Customer`, which
     * presumably represents a customer object that exists in the system.
     */
    async deleteJobOrders(customerExist: Customer){
        let order = customerExist.jobOrder
        for (let index = 0; index < order.length; index++) {
            await this.jobOrderService.deleteJobOrder(order[index].id)
        }
    }

    /**
     * This function validates if a customer exists based on their ID and logs an error message if they
     * do not.
     * @param {Customer} customerExist - A variable that holds information about whether a customer
     * exists or not. It is likely a boolean value.
     * @param {number} id_customer - The id number of the customer being validated.
     */
    validateCustomer(customerExist: Customer, id_customer: number){
        if(!customerExist){
            console.error(`No se a encontrado al cliente con id ${id_customer}`)
        }
    }
}
