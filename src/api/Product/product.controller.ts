import { Body, Controller, Post } from '@nestjs/common';
import { IProduct } from 'src/models/product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){}

    @Post()
    Create(@Body() params: IProduct){
        this.productService.create(params)
    }
}
