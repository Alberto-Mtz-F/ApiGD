
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { InventoryService } from '../Inventory/inventory.service';
import { Inventory } from 'src/entities/inventory.entity';
import { JobOrderService } from '../JobOrder/joborder.service';
import { JobOrder } from 'src/entities/joborder.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product,Inventory, JobOrder])],
    providers: [ProductService,InventoryService, JobOrderService],
    controllers: [ProductController],
})
export class ProductModule { }
