import { UserModule } from './api/User/user.module';
import { Module } from '@nestjs/common';
import { RoleModule } from './api/Role/role.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Connection } from './config/DBConnection';
import { EmployeeModule } from './api/Employee/employee.module';
import { InventoryModule } from './api/Inventory/inventory.module';
import { ProductModule } from './api/Product/product.module';
import { ProviderModule } from './api/Provider/provider.module';

@Module({
  imports: [Connection, RoleModule, UserModule, EmployeeModule, InventoryModule, ProductModule, ProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
