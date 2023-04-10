import { Body, Controller, Post, Get, Param, Put, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { IProduct } from 'src/models/product.model';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameImage } from 'src/helper/images.helper';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){}

    @Post()
    Create(@Body() params: IProduct){
        this.productService.create(params)
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file' , {
        storage: diskStorage({
            destination: './upload',
            filename: renameImage
        }),
        fileFilter: fileFilter
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() params:number){
        return await this.productService.uploadFile(file.filename , params);
    }

    @Get('/all')
    getallProduct(){
        return this.productService.getAll()
    }

    @Get(':id')
    getoneProduct(@Param('id') param){
        const empleado = this.productService.getbyID(param)
        return empleado ?? "El Producuto no existe"
    }

    @Put('/update/:id')
    updateProduct(@Body() product, @Param('id') id){
        return this.productService.updateProductbyID(Number(id), product)
    }

    @Delete('/delete/:id')
    deleteProductbyID(@Param('id') id){
        return this.productService.deleteProduct(Number(id))
    }
}
