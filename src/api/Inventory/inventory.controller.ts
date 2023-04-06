import { Body, Controller, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { IInventory } from 'src/models/inventory.model';

@Controller('inventory')
export class InventoryController {
    constructor(private inventoryService: InventoryService){}

    @Post()
    Create(@Body() params: IInventory){
        this.inventoryService.create(params)
    }

}
