import { ProductService } from './../Product/product.service';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from 'src/entities/provider.entity';
import { IProduct } from 'src/models/product.model';
import { IProvider } from 'src/models/provider.model';
import { Repository } from 'typeorm';

@Injectable()
export class ProviderService {
    constructor(
        @InjectRepository(Provider) private providerEntity : Repository<Provider>,
        private productService : ProductService
    ){}

    /**
     * This function creates a provider entity, saves it, and returns a list of products associated
     * with the provider.
     * @param {IProvider} provider - The parameter "provider" is an object that implements the
     * "IProvider" interface. It is used as input to the "create" method of some class. The "IProvider"
     * interface likely defines properties and methods that describe a provider of some service or
     * resource.
     * @returns the result of the `productlist` method with the `provider.product` and `response.id` as
     * its parameters.
     */
    async create(provider: IProvider){
        const proveedor = await this.providerfix(provider)
        const response = await this.providerEntity.save(proveedor)

        return await this.productlist(provider.product, response.id)
    }

    /**
     * This function returns all provider entities with their related products.
     * @returns The `getAll()` function is returning all the entities from the `providerEntity` table
     * along with their related `product` entities.
     */
    getAll(){
        return this.providerEntity.find({
            relations: ['product']
        })
    }

    /**
     * This function retrieves a provider and its associated products by ID, after validating that the
     * provider exists.
     * @param {number} id_Provider - The parameter `id_Provider` is a number that represents the unique
     * identifier of a provider entity in a database. The function `getbyID` uses this parameter to
     * retrieve a provider entity from the database with the matching `id` value. If the provider
     * entity is found, the function returns the
     * @returns The `getbyID` method is returning a `Promise` that resolves to a `Provider` entity
     * object with its related `Product` entity object(s) based on the provided `id_Provider`. Before
     * returning the entity object, it first checks if the provider exists and validates it using the
     * `validateProvider` method.
     */
    async getbyID(id_Provider: number){
        const providerExist = await this.providerEntity.findOne({where:{id:id_Provider}})
        this.validateProvider(providerExist, id_Provider)
        return await this.providerEntity.findOne({
            relations: ['product'],
            where:{id:id_Provider}
        })
    }
    
    /**
     * This is an async function that updates a provider by ID after validating its existence and
     * fixing any errors.
     * @param {number} id - a number representing the ID of the provider to be updated.
     * @param {IProvider} provider - The "provider" parameter is an object of type "IProvider" which
     * contains the updated information for a provider. This object is used to update the provider with
     * the specified "id" in the database.
     * @returns The `updateProviderbyID` function is returning a Promise that resolves to the result of
     * updating a provider in the database with the given `id` and `provider` object. The result is not
     * explicitly specified in the code snippet, but it is likely to be a boolean value indicating
     * whether the update was successful or not.
     */
    async updateProviderbyID(id: number, provider: IProvider){
        const providerExist = await this.providerEntity.findOne({where:{id:id}})
        this.validateProvider(providerExist, id)
        const proveedor = await this.providerfix(provider)
        
        return await this.providerEntity.update({id}, proveedor)
    }

    /**
     * This is an asynchronous function that deletes a provider and its associated products if it
     * exists.
     * @param {number} id - The ID of the provider that needs to be deleted.
     * @returns The `deleteProvider` function returns a Promise that resolves to either `false` if the
     * provider with the given `id` does not exist, or the result of deleting the provider with the
     * given `id` from the database.
     */
    async deleteProvider(id: number){
        const providerExist = await this.getbyID(id)
        if(!providerExist) return false

        await this.deleteproducts(providerExist)
        return await this.providerEntity.delete({id})
    }

    /**
     * This function deletes all products associated with a given provider.
     * @param {Provider} providerExist - The parameter `providerExist` is of type `Provider`, which is
     * an object that represents a provider. It is likely that this function is part of a larger
     * program that manages providers and their products. The `providerExist` object probably contains
     * information about the provider, including an array of products that they
     */
    async deleteproducts(providerExist: Provider){
        let product = providerExist.product
        for (let index = 0; index < providerExist.product.length; index++) {
            await this.productService.deleteProduct(product[index].id)
        }
    }

    /**
     * This function validates if a provider exists and logs an error message if it doesn't.
     * @param {Provider} providerExist - A variable that represents whether a provider exists or not.
     * It is likely a boolean value.
     * @param {number} id_Provider - The id of the provider that needs to be validated.
     */
    validateProvider(providerExist: Provider, id_Provider: number){
        if(!providerExist){
            console.error(`No se a encontrado el proveedor con id ${id_Provider}`)
        }
    }

    /**
     * The function "providerfix" takes an object of type "IProvider" and returns a new object with
     * selected properties.
     * @param {IProvider} provider - The parameter "provider" is an object of type "IProvider" that
     * contains information about a provider, such as their name, address, company, email, phone
     * number, and status. The function "providerfix" takes this object as input and returns a new
     * object with the same properties, but
     * @returns an object with properties "name", "address", "company", "email", "phonenumber", and
     * "status", which are taken from the input parameter "provider".
     */
    async providerfix (provider: IProvider){
        const proveedor = {
            name: provider.name,
            address: provider.address,
            company: provider.company,
            email: provider.email,
            phonenumber: provider.phonenumber,
            status: provider.status
        }
        return proveedor
    }

    /**
     * This function creates a product list for a given provider.
     * @param {IProduct} listprovider - IProduct is an interface or type that defines the structure of
     * an object that represents a product. It likely includes properties such as name, description,
     * price, and other details about the product.
     * @param {number} id_provider - The id_provider parameter is a number that represents the provider
     * of the product list. It is used to set the provider property of the listprovider object before
     * it is passed to the create method of the productService.
     * @returns The `create()` method of the `productService` is being returned.
     */
    async productlist(listprovider: IProduct, id_provider: number){
        listprovider.provider = id_provider

        return this.productService.create(listprovider)
    }
}
