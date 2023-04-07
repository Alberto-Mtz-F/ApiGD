import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { IProduct } from 'src/models/product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){}

    @Post()
    Create(@Body() params: IProduct){
        this.productService.create(params)
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
    updateProduct(@Body() product: IProduct, @Param('id') id){
        return this.productService.updateProductbyID(Number(id), product)
    }

    @Delete('/delete/:id')
    deleteProductbyID(@Param('id') id){
        return this.productService.deleteProduct(Number(id))
    }
}
