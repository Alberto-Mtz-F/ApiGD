import { Body, Controller, Post } from '@nestjs/common';
import { IEmployee } from 'src/models/employee.model';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService){}

    @Post()
    Create(@Body() params: IEmployee){
        this.employeeService.create(params)
    }
}
