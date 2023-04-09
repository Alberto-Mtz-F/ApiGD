
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IUser } from 'src/models/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    Create(@Body() params: IUser){
        this.userService.create(params)
    }

    @Get('/all')
    getallEmployee(){
        return this.userService.getAll()
    }

    @Get(':id')
    getoneEmployee(@Param('id') param){
        const empleado = this.userService.getbyID(param)
        return empleado ?? "El usuario no existe"
    }

    @Put('/update/:id')
    updateEmployee(@Body() user, @Param('id') id){
        return this.userService.updateUserbyID(Number(id), user)
    }

    @Delete('/delete/:id')
    deleteEmployeebyID(@Param('id') id){
        return this.userService.deleteUser(Number(id))
    }
}
