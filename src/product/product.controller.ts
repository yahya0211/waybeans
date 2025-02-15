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
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiCreatedResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: CreateProductDto,
  })
  @ApiBadRequestResponse({ description: 'Product is availabale', status: 400 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Post('addProducts')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create product',
    type: CreateProductDto,
  })
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    status: 201,
    description: 'The product has been successfully deleted.',
    type: CreateProductDto,
  })
  @ApiBadRequestResponse({
    description: 'Delete product unsuccessful',
    status: 400,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
