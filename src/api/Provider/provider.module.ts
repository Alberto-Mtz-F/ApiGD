import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from 'src/entities/provider.entity';
import { ProviderService } from './provider.service';
import { ProviderController } from './provider.controller';
import { ProductService } from '../Product/product.service';
import { Product } from 'src/entities/product.entity';
import { InventoryService } from '../Inventory/inventory.service';
import { Inventory } from 'src/entities/inventory.entity';
import { JobOrderService } from '../JobOrder/joborder.service';
import { JobOrder } from 'src/entities/joborder.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Provider,Product,Inventory, JobOrder])],
    providers: [ProviderService,ProductService,InventoryService, JobOrderService],
    controllers: [ProviderController],
})
export class ProviderModule { }
