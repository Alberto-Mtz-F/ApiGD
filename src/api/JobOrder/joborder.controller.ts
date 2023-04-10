import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { JobOrderService } from './joborder.service';
import { IJobOrder } from 'src/models/jobOrder.model';

@Controller('jobOrder')
export class JobOrderController {
    constructor( private jobOrderService: JobOrderService){}

    @Post()
    Create(@Body() params: IJobOrder){
        this.jobOrderService.create(params)
    }

    @Get('/all')
    getallJobOrder(){
        return this.jobOrderService.getAll()
    }

    @Get(':id')
    getoneJobOrder(@Param('id') param){
        const tarea = this.jobOrderService.getbyID(param)
        return tarea ?? "la tarea no existe"
    }

    @Put('/update/:id')
    updateJobOrder(@Body() jobOrder, @Param('id') id){
        return this.jobOrderService.updateJobOrderbyID(Number(id), jobOrder)
    }

    @Delete('/delete/:id')
    deletJobOrderbyID(@Param('id') id){
        return this.jobOrderService.deleteJobOrder(Number(id))
    }
 }
