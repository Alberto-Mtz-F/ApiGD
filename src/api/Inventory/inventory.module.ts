import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { Module } from '@nestjs/common';
import { Inventory } from 'src/entities/inventory.entity';
import { InventoryController } from './inventory.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Inventory])],
    providers: [InventoryService],
    controllers: [InventoryController],
})
export class InventoryModule { }
