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

    async create(provider: IProvider){
        const proveedor = await this.providerfix(provider)
        const response = await this.providerEntity.save(proveedor)

        return await this.productlist(provider.product, response.id)
    }

    getAll(){
        return this.providerEntity.find({
            relations: ['product']
        })
    }

    async getbyID(id_Provider: number){
        const providerExist = await this.providerEntity.findOne({where:{id:id_Provider}})
        this.validateProvider(providerExist, id_Provider)
        return await this.providerEntity.findOne({
            relations: ['product'],
            where:{id:id_Provider}
        })
    }
    
    async updateProviderbyID(id: number, provider: IProvider){
        const providerExist = await this.providerEntity.findOne({where:{id:id}})
        this.validateProvider(providerExist, id)
        const proveedor = await this.providerfix(provider)
        
        return await this.providerEntity.update({id}, proveedor)
    }

    async deleteProvider(id: number){
        const providerExist = await this.getbyID(id)
        if (providerExist){
            for (let index = 0; index < providerExist.product.length; index++) {
                await this.productService.deleteProduct(providerExist.product[index].id)
            }
        } 


        return await this.providerEntity.delete({id})
    }

    validateProvider(providerExist: Provider, id_Provider: number){
        if(!providerExist){
            console.error(`No se a encontrado el proveedor con id ${id_Provider}`)
        }
    }

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

    async productlist(listprovider: IProduct, id_provider: number){
        listprovider.provider = id_provider

        return this.productService.create(listprovider)
    }
}
