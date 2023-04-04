import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { IEmployee } from 'src/models/employee.model';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService){}

    @Post()
    Create(@Body() params: IEmployee){
        this.employeeService.create(params)
    }

    @Get('/all')
    getallemployee(){
        return this.employeeService.getAll()
    }

    @Get(':id')
    getoneemployee(@Param('id') param){
        const empleado = this.employeeService.getbyID(param)
        return empleado ?? "El empleado no existe"
    }

    
}
