
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { IUser } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserService { 
    constructor(
        @InjectRepository(User) private userEntity : Repository<User>
    ){}

    async create(user: IUser){
        return await this.userEntity.insert(user)
    }

    

}
