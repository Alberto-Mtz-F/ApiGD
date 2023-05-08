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

    /**
     * This function creates a job order by setting its name, finding its inventory, and saving it to
     * the job order entity.
     * @param {IJobOrder} jobOrder - IJobOrder, which is an interface representing a job order object.
     * @returns The `create` function is returning a Promise that resolves to an instance of
     * `IJobOrder` after setting its name and finding its inventory, and then saving it to the database
     * using the `jobOrderEntity.save` method.
     */
    async create (jobOrder: IJobOrder){
        let order:IJobOrder = this.setNameOrder(jobOrder);
        order.inventory = await this.findinventory(jobOrder)
        return await this.jobOrderEntity.save(order);
    }

   /**
    * This function returns all job orders with their related employee, customer, and inventory
    * entities.
    * @returns The `getAll()` function is returning an array of job orders with their related entities
    * such as employee, customer, and inventory.
    */
    getAll(){
        return this.jobOrderEntity.find({
            relations:['employee', 'customer' , 'inventory'],
        })
    }

    /**
     * This function retrieves a job order by its ID, validates its existence, and returns it with its
     * related entities.
     * @param {number} id_jobOrder - The parameter `id_jobOrder` is a number that represents the unique
     * identifier of a job order. This function uses this parameter to find a job order in the database
     * and return it with its related entities (employee, customer, and inventory).
     * @returns The function `getbyID` returns a Promise that resolves to a job order object with
     * related entities (employee, customer, and inventory) based on the provided `id_jobOrder`. Before
     * returning the job order object, the function first checks if the job order exists and validates
     * it using the `validateJobOrder` function.
     */
    async getbyID(id_jobOrder: number){
        const jobOrderExist = await this.jobOrderEntity.findOne({where:{id:id_jobOrder}})
        this.validateJobOrder(jobOrderExist, id_jobOrder)
        return await this.jobOrderEntity.findOne({
            relations:['employee', 'customer' , 'inventory'],
            where:{id:id_jobOrder}
        })
    }
    
    /**
     * This TypeScript function updates a job order by ID after validating its existence and checking
     * for changes in inventory.
     * @param {number} id - a number representing the ID of the job order to be updated.
     * @param {IJobOrder} jobOrder - jobOrder is an object of type IJobOrder, which contains
     * information about a job order. It is being passed as a parameter to the updateJobOrderbyID
     * function.
     * @returns the result of updating the job order with the given ID with the new job order data
     * provided, after validating that the job order exists and meets certain criteria. If the new job
     * order data includes changes to the inventory, the function will log a message saying that
     * changes to inventory are not allowed.
     */
    async updateJobOrderbyID(id: number, jobOrder: IJobOrder){
        const jobOrderExist = await this.jobOrderEntity.findOne({where:{id:id}})
        this.validateJobOrder(jobOrderExist, id)
        if (jobOrder.inventory) return console.log("NO SE PERMITEN CAMBIOS EN INVENTARIO")
        return await this.jobOrderEntity.update({id}, jobOrder)
    }

    /**
     * This is an asynchronous function that deletes a job order by its ID if it exists.
     * @param {number} id - The id parameter is a number that represents the unique identifier of a job
     * order that needs to be deleted.
     * @returns The `deleteJobOrder` function returns a Promise that resolves to the result of deleting
     * a job order entity with the specified `id` from the database. If the job order entity does not
     * exist, the function returns `false`.
     */
    async deleteJobOrder(id: number){
        const jobOrderExist = await this.getbyID(id)
        if(!jobOrderExist) return false

        return await this.jobOrderEntity.delete({id})
    }

    /**
     * This function finds inventory based on a given job order.
     * @param {IJobOrder} jobOrder - IJobOrder is likely an interface or type that defines the
     * structure of an object representing a job order. It could contain properties such as job order
     * ID, customer information, inventory items, and other relevant details. The function
     * `findinventory` takes in a job order object as a parameter and returns the
     * @returns The function `findinventory` returns an array of `CustomerEntity` objects that match
     * the IDs specified in the `inventory` property of the `jobOrder` object.
     */
    async findinventory(jobOrder: IJobOrder){
        const inventario = await this.customerEntity.findByIds(jobOrder.inventory)
        return inventario
    }

    /**
     * The function generates a unique name for a job order and creates a new order object with the
     * given quantity, customer, employee, status, and an empty inventory array.
     * @param {IJobOrder} jobOrder - An object representing a job order, with the following properties:
     * @returns The function `setNameOrder` returns an object with properties `name`, `quantity`,
     * `customer`, `employee`, `status`, and `inventory`. The `name` property is a randomly generated
     * hexadecimal string prefixed with "JobOrder_:".
     */
    setNameOrder(jobOrder: IJobOrder){
        const nameOrder = () => Math.round(Math.random() * 1600000).toString(16)
        const order = {
            name : `JobOrder_:${nameOrder()}`,
            quantity: jobOrder.quantity,
            customer: jobOrder.customer,
            employee: jobOrder.employee,
            status: jobOrder.status,
            inventory: []
        }
        return order
    }

    /**
     * This function validates if a job order exists and logs an error message if it doesn't.
     * @param {JobOrder} jobOrderExist - A variable that represents whether a job order exists or not.
     * It is a boolean value.
     * @param {number} id_jobOrder - The parameter id_jobOrder is a number representing the ID of a job
     * order that needs to be validated.
     */
    validateJobOrder(jobOrderExist: JobOrder, id_jobOrder: number){
        if(!jobOrderExist){
            console.error(`No se a encontrado a la orden con id ${id_jobOrder}`)
        }
    }
 }
