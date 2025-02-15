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
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Carts')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  status: 401,
  description: 'Unauthorized',
})
@Controller('carts')
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiCreatedResponse({
    status: 201,
    description: 'The cart has been successfully created.',
    type: CreateCartDto,
  })
  @ApiBadRequestResponse({ description: 'Product is availabale', status: 400 })
  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const userId = req.user.id;

    return this.cartsService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('findId/:id')
  async findOne(@Param('id') id: string) {
    return this.cartsService.findOne(id);
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'The cart has been successfully updated.',
    type: UpdateCartDto,
  })
  @ApiBadRequestResponse({ description: 'Cart is undefined', status: 400 })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(id, updateCartDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.cartsService.remove(id);
  }
}
