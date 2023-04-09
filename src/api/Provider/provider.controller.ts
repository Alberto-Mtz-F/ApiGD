import { Body, Controller, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { IProvider } from 'src/models/provider.model';

@Controller('provider')
export class ProviderController { 
    constructor(private providerService: ProviderService){}

    @Post()
    Create(@Body() params: IProvider){
        this.providerService.create(params)
    }

    @Get('/all')
    getallProvider(){
        return this.providerService.getAll()
    }

    @Get(':id')
    getoneProvider(@Param('id') param){
        const empleado = this.providerService.getbyID(param)
        return empleado ?? "El proveedor no existe"
    }

    @Put('/update/:id')
    updateProvider(@Body() provaider, @Param('id') id){
        return this.providerService.updateProviderbyID(Number(id), provaider)
    }

    @Delete('/delete/:id')
    deleteProviderbyID(@Param('id') id){
        return this.providerService.deleteProvider(Number(id))
    }

}
