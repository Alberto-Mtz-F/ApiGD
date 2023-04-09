import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobOrder } from 'src/entities/joborder.entity';
import { JobOrderService } from './joborder.service';
import { JobOrderController } from './joborder.controller';
import { Inventory } from 'src/entities/inventory.entity';

@Module({
    imports: [TypeOrmModule.forFeature([JobOrder,Inventory])],
    providers: [JobOrderService],
    controllers: [JobOrderController],
    
})
export class JobOrderModule { }
