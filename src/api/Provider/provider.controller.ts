import { Body, Controller, Post } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { IProvider } from 'src/models/provider.model';

@Controller('provider')
export class ProviderController { 
    constructor(private providerService: ProviderService){}

    @Post()
    Create(@Body() params: IProvider){
        this.providerService.create(params)
    }

}
