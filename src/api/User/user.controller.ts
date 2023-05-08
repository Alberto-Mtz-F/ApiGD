
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
    getallUser(){
        return this.userService.getAll()
    }

    @Get(':id')
    getoneUser(@Param('id') param){
        const user = this.userService.getbyID(param)
        return user ?? "El usuario no existe"
    }

    @Get('/one/:uuid')
    getoneUserforUUID(@Param('uuid') param){
        const user = this.userService.getbyUUID(param)
        return user ?? "El usuario no existe"
    }

    @Put('/update/:id')
    updateUser(@Body() user, @Param('id') id){
        return this.userService.updateUserbyID(Number(id), user)
    }

    @Delete('/delete/:id')
    deleteUserbyID(@Param('id') id){
        return this.userService.deleteUser(Number(id))
    }
}
