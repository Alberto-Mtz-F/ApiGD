import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobOrder } from 'src/entities/joborder.entity';
import { JobOrderService } from './joborder.service';
import { JobOrderController } from './joborder.controller';
import { Inventory } from 'src/entities/inventory.entity';
import { ProductService } from '../Product/product.service';
import { Product } from 'src/entities/product.entity';
import { InventoryService } from '../Inventory/inventory.service';

@Module({
    imports: [TypeOrmModule.forFeature([JobOrder,Inventory, Product])],
    providers: [JobOrderService,InventoryService, ProductService],
    controllers: [JobOrderController],
    
})
export class JobOrderModule { }
