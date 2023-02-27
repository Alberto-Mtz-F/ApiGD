import { RoleService } from './role.service';

import { Body, Controller, Post } from '@nestjs/common';
import { IRole } from 'src/models/role.model';

@Controller('role')
export class RoleController {
    constructor( private roleService: RoleService){}

    @Post()
    Create(@Body() params: IRole){
        this.roleService.create(params)
    }

}
