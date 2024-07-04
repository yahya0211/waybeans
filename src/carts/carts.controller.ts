import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('carts')
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.BUYER)
  @Post(':productId')
  async create(
    @Body() createCartDto: CreateCartDto,
    @Request() req,
    @Param('productId') productId: string,
  ) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('token invalid');
    }

    try {
      const decode = this.jwtService.decode(token);
      console.log(decode);

      createCartDto.userId = decode.id;

      createCartDto.productId = productId;

      const cartItem = await this.cartsService.create({
        ...createCartDto,
      });
      return cartItem;
    } catch (error) {
      throw new BadRequestException(`Failed to create car: ${error.message}`);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.BUYER)
  @Get()
  async findAll(@Request() req) {
    const userId = req.user.id;
    console.log(userId);

    return this.cartsService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.BUYER)
  @Get('findId/:id')
  async findOne(@Param('id') id: string) {
    return this.cartsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.BUYER)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(id, updateCartDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.BUYER)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }
}
