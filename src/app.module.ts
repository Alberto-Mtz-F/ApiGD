import { UserModule } from './api/User/user.module';
import { Module } from '@nestjs/common';
import { RoleModule } from './api/Role/role.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Connection } from './config/DBConnection';
import { EmployeeModule } from './api/Employee/employee.module';

@Module({
  imports: [Connection, RoleModule, UserModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
