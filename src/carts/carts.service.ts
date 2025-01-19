import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateCartDto) {
    try {
      const existProduct = await this.prisma.product.findFirst({
        where: {
          id: dto.productId,
        },
      });

      if (!existProduct) {
        throw new BadRequestException("Product doesn't exist");
      }

      const existingCart = await this.prisma.cart.findFirst({
        where: {
          userId: dto.userId,
          productId: existProduct.id,
        },
      });

      if (existingCart) {
        throw new BadRequestException('Product is already in your cart');
      }

      const cartItem = await this.prisma.cart.create({
        data: {
          productId: existProduct.id,
          userId: dto.userId,
          qty: 1,
          totalPrice: existProduct.price,
        },
      });

      return cartItem;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }

  async findAll(userId: string) {
    try {
      return this.prisma.cart.findMany({
        where: { userId },
        include: {
          product: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
    }
  }

  async findOne(id: string) {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { id },
        include: {
          product: true,
        },
      });

      if (!cart) {
        throw new HttpException(
          `Cart with ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return cart;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
    }
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    try {
      const findCart = await this.prisma.cart.findFirst({
        where: { id },
        include: {
          product: true,
        },
      });

      if (!findCart.product || findCart.product.stock <= 0) {
        throw new HttpException('Stock is not available', HttpStatus.CONFLICT);
      }

      if (findCart.product.stock - parseInt(updateCartDto.qty) < 0) {
        throw new HttpException(`Stock not available`, HttpStatus.CONFLICT);
      }

      const totalOrder = parseInt(updateCartDto.qty);
      const totalPrice = totalOrder * findCart.product.price;

      return await this.prisma.cart.update({
        where: { id: id },
        data: {
          qty: totalOrder,
          totalPrice: totalPrice,
        },
      });
    } catch (error) {
      throw new BadRequestException('Cannot buy this product', error.message);
    }
  }

  async remove(id: string) {
    const cartItem = await this.prisma.cart.delete({
      where: { id },
    });

    return cartItem;
  }
}
