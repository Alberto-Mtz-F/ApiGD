import { IsString } from "class-validator";

export class IRole{
    @IsString()
    name: string;
    
}