import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Request,
  UploadedFile,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/enums/role.enum';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Post('addProducts')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() dto: CreateProductDto,
    @Request() req,
    @UploadedFile() photoProduct: Express.Multer.File,
  ) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('token invalid');
    }

    try {
      const decoded = this.jwtService.decode(token);

      const userId = decoded.id;

      return this.productService.create(dto, photoProduct, userId);
    } catch (error) {
      throw new BadRequestException(
        'Failed to create product:' + error.message,
      );
    }
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
