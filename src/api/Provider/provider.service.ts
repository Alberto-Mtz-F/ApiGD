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
        console.log(provider)
        const proveedor =  {
            name: provider.name,
            address: provider.address,
            company: provider.company,
            email: provider.email,
            phonenumber: provider.phonenumber,
            status: provider.status
        }
        const response = await this.providerEntity.save(proveedor)

        return await this.productlist(provider.product, response.id)
       

    }

    async productlist(listprovider: IProduct, id_provider: number){
        listprovider.provider = id_provider

        return this.productService.create(listprovider)
    }
}
