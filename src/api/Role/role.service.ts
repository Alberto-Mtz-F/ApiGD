import { IRole } from './../../models/role.model';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private roleEntity : Repository<Role>
    ){}

    async create (role: IRole){
        return await this.roleEntity.insert(role);
    }
}
