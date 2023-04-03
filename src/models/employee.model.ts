import { IUser } from "./user.model";

export interface IEmployee{
    name : string;

    fristSurname : string;

    secondSurname : string;
    
    birthday: string;

    email: string;

    phonenumber: string;

    status: string;

    user: IUser
}