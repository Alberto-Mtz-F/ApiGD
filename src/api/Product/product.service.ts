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
        return await this.inventoryService.create(inventario)
    }

    async uploadFile (filename: string, id_Product: number ){
        const file = {
            image: filename
        }

        return await this.productEntity.update(id_Product , file)

    }
    
    getAll(){
        return this.productEntity.find({
            relations: ['inventory', 'provider']
        })
    }

    async getbyID(id_Product: number){
        const productExist = await this.productEntity.findOne({where:{id:id_Product}})
        this.validateProduct(productExist, id_Product)
        return await this.productEntity.findOne({
            relations: ['inventory', 'provider'],
            where:{id:id_Product}
        })
    }
    
    async updateProductbyID(id: number, product: IProduct){
        const productExist = await this.productEntity.findOne({where:{id:id}})
        this.validateProduct(productExist, id)
        
        return await this.productEntity.update({id}, product)
    }

    async deleteProduct(id: number){
        const productExist = await this.getbyID(id)
        
        if (productExist) await this.inventoryService.deleteInventory(productExist.inventory.id)
        return await this.productEntity.delete({id})
    }

    validateProduct(productExist: Product, id_Product: number){
        if(!productExist){
            console.error(`No se a encontrado el producto con id ${id_Product}`)
        }
    }
}
