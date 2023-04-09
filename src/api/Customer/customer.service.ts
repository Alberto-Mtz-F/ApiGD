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

    async create (customer: ICustomer){
        return await this.customerEntity.insert(customer);
    }

    getAll(){
        return this.customerEntity.find({
            relations:['jobOrder'],
        })
    }

    async getbyID(id_customer: number){
        const customerExist = await this.customerEntity.findOne({where:{id:id_customer}})
        this.validateCustomer(customerExist, id_customer)
        return await this.customerEntity.findOne({
            relations:['jobOrder'],
            where:{id:id_customer}
        })
    }
    
    async updateCustomerbyID(id: number, customer: ICustomer){
        const customerExist = await this.customerEntity.findOne({where:{id:id}})
        this.validateCustomer(customerExist, id)
        
        return await this.customerEntity.update({id}, customer)
    }

    async deleteCustomer(id: number){
        const customerExist = await this.getbyID(id)
        if (!customerExist) return false
        await this.deleteJobOrders(customerExist)
        return await this.customerEntity.delete({id})
    }

    async deleteJobOrders(customerExist: Customer){
        let order = customerExist.jobOrder
        for (let index = 0; index < order.length; index++) {
            await this.jobOrderService.deleteJobOrder(order[index].id)
        }
    }

    validateCustomer(customerExist: Customer, id_customer: number){
        if(!customerExist){
            console.error(`No se a encontrado al cliente con id ${id_customer}`)
        }
    }
}
