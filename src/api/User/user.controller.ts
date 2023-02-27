
import { Body, Controller, Post } from '@nestjs/common';
import { IUser } from 'src/models/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    Create(@Body() params: IUser){
        this.userService.create(params)
    }
}
