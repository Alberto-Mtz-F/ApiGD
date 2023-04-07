import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { IInventory } from 'src/models/inventory.model';

@Controller('inventory')
export class InventoryController {
    constructor(private inventoryService: InventoryService){}

    @Post()
    Create(@Body() params: IInventory){
        this.inventoryService.create(params)
    }

    @Get('/all')
    getallInventory(){
        return this.inventoryService.getAll()
    }

    @Get(':id')
    getoneInventory(@Param('id') param){
        const empleado = this.inventoryService.getbyID(param)
        return empleado ?? "El empleado no existe"
    }

    @Put('/update/:id')
    updateInvntory(@Body() inventory: IInventory, @Param('id') id){
        return this.inventoryService.updateInventorybyID(Number(id), inventory)
    }

    @Delete('/delete/:id')
    deleteInventorybyID(@Param('id') id){
        return this.inventoryService.deleteInventory(Number(id))
    }

}
