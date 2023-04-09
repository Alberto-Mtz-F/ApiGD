import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { ICustomer } from 'src/models/customer.model';

@Controller('customer')
export class CustomerController { 
    constructor( private customerService: CustomerService){}

    @Post()
    Create(@Body() params: ICustomer){
        this.customerService.create(params)
    }

    @Get('/all')
    getallCustomer(){
        return this.customerService.getAll()
    }

    @Get(':id')
    getoneCustomer(@Param('id') param){
        const empleado = this.customerService.getbyID(param)
        return empleado ?? "El rol no existe"
    }

    @Put('/update/:id')
    updateCustomer(@Body() customer: ICustomer, @Param('id') id){
        return this.customerService.updateCustomerbyID(Number(id), customer)
    }

    @Delete('/delete/:id')
    deletCustomerbyID(@Param('id') id){
        return this.customerService.deleteCustomer(Number(id))
    }
}
