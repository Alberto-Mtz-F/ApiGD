import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
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
    getallEmployee(){
        return this.employeeService.getAll()
    }

    @Get(':id')
    getoneEmployee(@Param('id') param){
        const empleado = this.employeeService.getbyID(param)
        return empleado ?? "El empleado no existe"
    }

    @Put('/update/:id')
    updateEmployee(@Body() employee, @Param('id') id){
        return this.employeeService.updateEmployeebyID(Number(id), employee)
    }

    @Delete('/delete/:id')
    deleteEmployeebyID(@Param('id') id){
        return this.employeeService.deleteEmployee(Number(id))
    }
}
