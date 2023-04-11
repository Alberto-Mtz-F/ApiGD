import { EmployeeService } from './employee.service';
import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/entities/employee.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from '../User/user.service';
import { Role } from 'src/entities/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Employee,User, Role])],
    providers: [EmployeeService,UserService],
    controllers: [EmployeeController],
    
})
export class EmployeeModule { }
