import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from 'src/entities/provider.entity';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { ProductService } from '../Product/product.service';
import { Product } from 'src/entities/product.entity';
import { InventoryService } from '../Inventory/inventory.service';
import { Inventory } from 'src/entities/inventory.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Provider,Product,Inventory])],
    providers: [ProviderService,ProductService,InventoryService],
    controllers: [ProviderController],
})
export class ProviderModule { }
