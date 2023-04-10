import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { Module } from '@nestjs/common';
import { Inventory } from 'src/entities/inventory.entity';
import { InventoryController } from './inventory.controller';
import { JobOrder } from 'src/entities/joborder.entity';
import { JobOrderService } from '../JobOrder/joborder.service';
import { ProductService } from '../Product/product.service';
import { Product } from 'src/entities/product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Inventory, JobOrder, Product])],
    providers: [InventoryService,JobOrderService, ProductService],
    controllers: [InventoryController],
})
export class InventoryModule { }
