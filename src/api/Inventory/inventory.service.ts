import { IInventory } from './../../models/inventory.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from 'src/entities/inventory.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../Product/product.service';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory) private inventoryEntity : Repository<Inventory>,
    ){}

    async create(inventory: IInventory){
        return await this.inventoryEntity.insert(inventory)
    }

    getAll(){
        return this.inventoryEntity.find({
            relations:['product', 'jobOrder']
        })
    }

    async getbyID(id_inventory: number){
        const inventoryExist = await this.inventoryEntity.findOne({where:{id:id_inventory}})
        this.validateInventory(inventoryExist, id_inventory)
        return await this.inventoryEntity.findOne({
            relations:['product', 'jobOrder'],
            where:{id:id_inventory}
        })
    }
    
    async updateInventorybyID(id: number, inventory: IInventory){
        const inventoryExist = await this.inventoryEntity.findOne({where:{id:id}})
        this.validateInventory(inventoryExist, id)
        
        return await this.inventoryEntity.update({id}, inventory)
    }

    async deleteInventory(id: number){
        const inventoryExist = await this.inventoryEntity.findOne({where:{id:id}})
        this.validateInventory(inventoryExist, id)
        return await this.inventoryEntity.delete({id})
    }

    validateInventory(inventoryExist: Inventory, id_inventory: number){
        if(!inventoryExist){
            console.error(`No se a encontrado inventario con id ${id_inventory}`)
        }
    }
}
