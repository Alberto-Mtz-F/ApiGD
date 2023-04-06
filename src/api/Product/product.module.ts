
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { InventoryService } from '../Inventory/inventory.service';
import { Inventory } from 'src/entities/inventory.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product,Inventory])],
    providers: [ProductService,InventoryService],
    controllers: [ProductController],
})
export class ProductModule { }
