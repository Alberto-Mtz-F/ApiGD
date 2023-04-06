import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { IInventory } from 'src/models/inventory.model';
import { IProduct } from 'src/models/product.model';
import { Repository } from 'typeorm';
import { InventoryService } from '../Inventory/inventory.service';

@Injectable()
export class ProductService { 
    constructor(
        @InjectRepository(Product) private productEntity : Repository<Product>,
        private inventoryService: InventoryService,
        
    ){}

    async create(product: IProduct){
        const response =  await this.productEntity.save(product)
        const inventario: IInventory = {
            quantity: response.inventory.quantity,
            spot: response.inventory.spot,
            product: response.id
        }
        return this.inventoryService.create(inventario)
        
    }

    
    
}
