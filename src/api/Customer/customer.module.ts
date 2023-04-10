import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/entities/customer.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { JobOrderService } from '../JobOrder/joborder.service';
import { JobOrder } from 'src/entities/joborder.entity';
import { Inventory } from 'src/entities/inventory.entity';
import { ProductService } from '../Product/product.service';
import { Product } from 'src/entities/product.entity';
import { InventoryService } from '../Inventory/inventory.service';

@Module({
    imports: [TypeOrmModule.forFeature([Customer, JobOrder, Inventory, Product])],
    providers: [CustomerService, JobOrderService,InventoryService, ProductService],
    controllers: [CustomerController],
    
})
export class CustomerModule { }
