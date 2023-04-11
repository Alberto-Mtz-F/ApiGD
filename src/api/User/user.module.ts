import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Role } from 'src/entities/role.entity';
import { Employee } from 'src/entities/employee.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Role, Employee])],
    providers: [UserService],
    controllers: [UserController],
    
})
export class UserModule { }
