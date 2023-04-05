import { RoleService } from './role.service';

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IRole } from 'src/models/role.model';

@Controller('role')
export class RoleController {
    constructor( private roleService: RoleService){}

    @Post()
    Create(@Body() params: IRole){
        this.roleService.create(params)
    }

    @Get('/all')
    getallRole(){
        return this.roleService.getAll()
    }

    @Get(':id')
    getoneRole(@Param('id') param){
        const empleado = this.roleService.getbyID(param)
        return empleado ?? "El rol no existe"
    }

    @Put('/update/:id')
    updateRole(@Body() role: IRole, @Param('id') id){
        return this.roleService.updateRolebyID(Number(id), role)
    }

    @Delete('/delete/:id')
    deleteRolebyID(@Param('id') id){
        return this.roleService.deleteRole(Number(id))
    }

}
