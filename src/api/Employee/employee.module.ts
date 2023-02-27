import { EmployeeService } from './employee.service';
import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/entities/employee.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Employee])],
    providers: [EmployeeService,],
    controllers: [EmployeeController],
    
})
export class EmployeeModule { }
