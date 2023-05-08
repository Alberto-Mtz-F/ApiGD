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

    /**
     * This function creates a new product and its corresponding inventory in a database.
     * @param {IProduct} product - The product parameter is an object that implements the IProduct
     * interface. It contains information about a product, such as its name, description, price, and
     * inventory.
     * @returns The `create` method is returning the result of calling the `create` method of the
     * `inventoryService` with an `IInventory` object as its argument.
     */
    async create(product: IProduct){
        const response =  await this.productEntity.save(product)
        const inventario: IInventory = {
            quantity: response.inventory.quantity,
            spot: response.inventory.spot,
            product: response.id
        }
        return await this.inventoryService.create(inventario)
    }

    /**
     * This is an async function that updates a product entity with a new image file.
     * @param {string} filename - A string representing the name of the file to be uploaded.
     * @param {number} id_Product - The id of the product that the file is being uploaded for.
     * @returns the result of the update operation performed on the product entity with the given
     * id_Product, using the file object containing the image filename. The return value is not
     * specified in the code snippet, but it is likely to be a Promise or a specific data type
     * depending on the database or ORM being used.
     */
    async uploadFile (filename: string, id_Product: number ){
        const file = {
            image: filename
        }
        return await this.productEntity.update(id_Product , file)
    }
    
    /**
     * This function returns all products with their related inventory and provider entities.
     * @returns The `getAll()` function is returning an array of product entities that have their
     * related inventory and provider entities included.
     */
    getAll(){
        return this.productEntity.find({
            relations: ['inventory', 'provider']
        })
    }

    /**
     * This function retrieves a product by its ID, validates its existence, and returns it with its
     * related inventory and provider entities.
     * @param {number} id_Product - The parameter `id_Product` is a number that represents the unique
     * identifier of a product. This function is used to retrieve a product from the database by its
     * ID.
     * @returns The function `getbyID` is returning a product entity with its related inventory and
     * provider entities, after validating that the product exists in the database.
     */
    async getbyID(id_Product: number){
        const productExist = await this.productEntity.findOne({where:{id:id_Product}})
        this.validateProduct(productExist, id_Product)
        return await this.productEntity.findOne({
            relations: ['inventory', 'provider'],
            where:{id:id_Product}
        })
    }
    
    /**
     * This function updates a product in a database by its ID.
     * @param {number} id - The ID of the product that needs to be updated in the database.
     * @param {IProduct} product - IProduct is likely an interface or type that defines the structure
     * of a product object. It could include properties such as name, description, price, and any other
     * relevant information about a product. The updateProductbyID function takes in a product object
     * and updates the product with the specified ID in the database
     * @returns The `updateProductbyID` function is returning a promise that resolves to the result of
     * updating the product with the given `id` in the database with the new `product` data.
     */
    async updateProductbyID(id: number, product: IProduct){
        const productExist = await this.productEntity.findOne({where:{id:id}})
        this.validateProduct(productExist, id)
        
        return await this.productEntity.update({id}, product)
    }

    /**
     * This TypeScript function deletes a product by ID and also deletes its associated inventory.
     * @param {number} id - The ID of the product that needs to be deleted.
     * @returns a Promise that resolves to either `false` if the product with the given `id` does not
     * exist, or the result of deleting the product with the given `id` from the database using the
     * `productEntity.delete()` method.
     */
    async deleteProduct(id: number){
        const productExist = await this.getbyID(id)
        if (!productExist) return false
        await this.inventoryService.deleteInventory(productExist.inventory.id)
        return await this.productEntity.delete({id})
    }

    /**
     * This function validates if a product exists based on its ID and logs an error message if it
     * doesn't.
     * @param {Product} productExist - A variable that represents whether a product exists or not. It
     * is likely a boolean value.
     * @param {number} id_Product - The id of the product that needs to be validated.
     */
    validateProduct(productExist: Product, id_Product: number){
        if(!productExist){
            console.error(`No se a encontrado el producto con id ${id_Product}`)
        }
    }
}
