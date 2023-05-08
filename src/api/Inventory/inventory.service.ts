import { JobOrderService } from './../JobOrder/joborder.service';
import { IInventory } from './../../models/inventory.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from 'src/entities/inventory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory) private inventoryEntity : Repository<Inventory>,

        private jobOrderService: JobOrderService,
    ){}

    /**
     * This function creates a new inventory record in a database using an asynchronous operation in
     * TypeScript.
     * @param {IInventory} inventory - The parameter "inventory" is of type "IInventory", which is
     * likely an interface or a type defined elsewhere in the codebase. It represents an object that
     * contains information about an inventory, such as its name, description, quantity, and other
     * relevant details. This parameter is used as input to the
     * @returns The `create` method is returning a promise that resolves to the result of inserting the
     * `inventory` object into the `inventoryEntity`.
     */
    async create(inventory: IInventory){
        return await this.inventoryEntity.insert(inventory)
    }

    /**
     * The function returns all inventory entities with their related product and job order entities.
     * @returns The `getAll()` function is returning all the records from the `inventoryEntity` table
     * along with their related `product` and `jobOrder` records.
     */
    getAll(){
        return this.inventoryEntity.find({
            relations:['product', 'jobOrder']
        })
    }

    /**
     * This function retrieves an inventory item by its ID, validates its existence, and returns it
     * with its associated product and job order.
     * @param {number} id_inventory - The parameter `id_inventory` is a number that represents the
     * unique identifier of an inventory item. This function uses this parameter to find and return the
     * inventory item with the matching ID.
     * @returns The function `getbyID` returns an inventory object with its related product and job
     * order, after validating that the inventory exists and throwing an error if it doesn't.
     */
    async getbyID(id_inventory: number){
        const inventoryExist = await this.inventoryEntity.findOne({where:{id:id_inventory}})
        this.validateInventory(inventoryExist, id_inventory)
        return await this.inventoryEntity.findOne({
            relations:['product', 'jobOrder'],
            where:{id:id_inventory}
        })
    }
    
    /**
     * This function updates an inventory by its ID in a TypeScript application.
     * @param {number} id - The ID of the inventory item that needs to be updated.
     * @param {IInventory} inventory - The `inventory` parameter is an object of type `IInventory` that
     * contains the updated inventory information that needs to be saved in the database.
     * @returns The `updateInventorybyID` function is returning a promise that resolves to the result
     * of updating the inventory entity with the specified `id` with the new `inventory` data.
     */
    async updateInventorybyID(id: number, inventory: IInventory){
        const inventoryExist = await this.inventoryEntity.findOne({where:{id:id}})
        this.validateInventory(inventoryExist, id)
        
        return await this.inventoryEntity.update({id}, inventory)
    }

    /**
     * This is an async function that deletes an inventory item by ID after checking if it exists and
     * deleting its associated job order.
     * @param {number} id - The id parameter is a number that represents the unique identifier of the
     * inventory item that needs to be deleted.
     * @returns a Promise that resolves to the result of deleting an inventory entity with the
     * specified ID from the database. If the inventory does not exist, it returns false. Before
     * deleting the inventory, it also deletes any associated job orders using the `deletejobOrder`
     * method.
     */
    async deleteInventory(id: number){
        const inventoryExist = await this.getbyID(id)
        if (!inventoryExist) return false
        await this.deletejobOrder(inventoryExist)
        return await this.inventoryEntity.delete({id})
    }

    /**
     * This function deletes all job orders associated with a given inventory.
     * @param {Inventory} inventoryExist - The parameter `inventoryExist` is of type `Inventory`, which
     * is an object that likely contains information about an inventory, such as its ID, name, and a
     * list of job orders associated with it. The function `deletejobOrder` takes this `Inventory`
     * object as input and deletes all the
     */
    async deletejobOrder(inventoryExist: Inventory){
        let order = inventoryExist.jobOrder
        for (let index = 0; index < order.length; index++) {
            await this.jobOrderService.deleteJobOrder(order[index].id)
        }
    }

    /**
     * This function validates if an inventory exists based on its ID and logs an error message if it
     * doesn't.
     * @param {Inventory} inventoryExist - This parameter is of type Inventory and represents an
     * existing inventory object that is being checked for validation.
     * @param {number} id_inventory - The id of the inventory that needs to be validated.
     */
    validateInventory(inventoryExist: Inventory, id_inventory: number){
        if(!inventoryExist){
            console.error(`No se a encontrado inventario con id ${id_inventory}`)
        }
    }
}
