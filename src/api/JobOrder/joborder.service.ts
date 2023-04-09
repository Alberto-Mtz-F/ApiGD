import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from 'src/entities/inventory.entity';
import { JobOrder } from 'src/entities/joborder.entity';
import { IJobOrder } from 'src/models/jobOrder.model';
import { Repository } from 'typeorm';

@Injectable()
export class JobOrderService {
    constructor(
        @InjectRepository(JobOrder) private jobOrderEntity : Repository<JobOrder>,
        @InjectRepository(Inventory) private customerEntity : Repository<Inventory>
    ){}

    async create (jobOrder: IJobOrder){
        let order:IJobOrder = this.setNameOrder(jobOrder);
        order.inventory = await this.findinventory(jobOrder)
        return await this.jobOrderEntity.save(order);
    }

    getAll(){
        return this.jobOrderEntity.find({
            relations:['employee', 'customer' , 'inventory'],
        })
    }

    async getbyID(id_jobOrder: number){
        const jobOrderExist = await this.jobOrderEntity.findOne({where:{id:id_jobOrder}})
        this.validateJobOrder(jobOrderExist, id_jobOrder)
        return await this.jobOrderEntity.findOne({
            relations:['employee', 'customer' , 'inventory'],
            where:{id:id_jobOrder}
        })
    }
    
    async updateJobOrderbyID(id: number, jobOrder: IJobOrder){
        const jobOrderExist = await this.jobOrderEntity.findOne({where:{id:id}})
        this.validateJobOrder(jobOrderExist, id)
        if (jobOrder.inventory) return console.log("NO SE PERMITEN CAMBIOS EN INVENTARIO")
        return await this.jobOrderEntity.update({id}, jobOrder)
    }

    async deleteJobOrder(id: number){
        const jobOrderExist = await this.jobOrderEntity.findOne({where:{id:id}})
        this.validateJobOrder(jobOrderExist, id)
        return await this.jobOrderEntity.delete({id})
    }

    async findinventory(jobOrder: IJobOrder){
        const inventario = await this.customerEntity.findByIds(jobOrder.inventory)
        return inventario
    }

    setNameOrder(jobOrder: IJobOrder){
        const nameOrder = () => Math.round(Math.random() * 1600000).toString(16)
        const order = {
            name : `JobOrder_:${nameOrder()}`,
            quantity: jobOrder.quantity,
            customer: jobOrder.customer,
            employee: jobOrder.employee,
            inventory: []
        }
        return order
    }

    validateJobOrder(jobOrderExist: JobOrder, id_jobOrder: number){
        if(!jobOrderExist){
            console.error(`No se a encontrado a la orden con id ${id_jobOrder}`)
        }
    }
 }
