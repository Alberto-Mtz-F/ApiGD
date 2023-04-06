import { IInventory } from './../../models/inventory.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from 'src/entities/inventory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory) private inventoryEntity : Repository<Inventory>,
        
    ){}

    async create(inventory: IInventory){
        return await this.inventoryEntity.insert(inventory)
    }
}
