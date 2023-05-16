import { Employee } from './../entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/entities/customer.entity';
import { Inventory } from 'src/entities/inventory.entity';
import { JobOrder } from 'src/entities/joborder.entity';
import { Product } from 'src/entities/product.entity';
import { Provider } from 'src/entities/provider.entity';
import { Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';

export const Connection = TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'bowennpp14ifnamaop6r-mysql.services.clever-cloud.com',
    port: 3306 ,
    username: 'utqwvzrfg6w1mzxl',
    password: 'qr1rZL5TXmRz98aP2JRA',
    database: 'bowennpp14ifnamaop6r',
    ssl: {rejectUnauthorized: false},
    entities: [Role,User,Employee,Inventory,Product,Provider, JobOrder, Customer],
    synchronize: false,
    
})