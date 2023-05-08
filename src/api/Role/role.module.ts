import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { UserService } from '../User/user.service';
import { User } from 'src/entities/user.entity';
import { Employee } from 'src/entities/employee.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Role, User, Employee])],
    providers: [RoleService, UserService],
    controllers: [RoleController],
    
})
export class RoleModule { }
