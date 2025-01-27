import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionStateus } from './enums/transactions.enum';

import cloudinary from 'src/config/cloudinary';
import * as fs from 'fs';
import { MidtransService } from 'src/midtrans/midtrans.service';

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
    private readonly snap: MidtransService,
  ) {}
  async create(
    createTransactionDto: CreateTransactionDto,
    file: Express.Multer.File,
    cartId: string,
  ): Promise<any> {
    try {
      const findCarts = await this.prisma.cart.findFirst({
        where: { id: cartId },
        include: {
          product: true,
          user: true,
        },
      });

      if (!findCarts) {
        throw new Error('Cart not found');
      }

      let imageUrl: string = createTransactionDto.attachment || '';
      if (file) {
        const filePath = file as unknown as Express.Multer.File;

        const cloudinaryUpload = await cloudinary.uploader.upload(
          filePath.path,
          {
            folder: 'transactions',
          },
        );

        imageUrl = cloudinaryUpload.secure_url;
        fs.unlinkSync(filePath.path);
      }

      const transaction = await this.prisma.transaction.create({
        data: {
          name: createTransactionDto.name,
          email: createTransactionDto.email,
          phone: createTransactionDto.phone,
          postCode: createTransactionDto.postCode,
          address: createTransactionDto.address,
          attachment: imageUrl,
          pay: false,
          productPrice: findCarts.product.price,
          status: TransactionStateus.WAITING_APPROVE,
          user: {
            connect: { id: findCarts.user.id },
          },
          cart: {
            connect: { id: findCarts.id },
          },
        },
      });

      const totalItemPrice = transaction.productPrice * findCarts.qty;

      let payment = await this.snap.createSnapTransaction({
        transaction_details: {
          order_id: findCarts.id + Math.random().toString(36).substr(2, 9),
          gross_amount: totalItemPrice,
        },
        item_details: [
          {
            id: findCarts.id,
            price: transaction.productPrice,
            quantity: findCarts.qty,
            name: findCarts.product.nameProduct,
            brand: 'waybeans',
            category: 'food',
            merchant_name: 'waybeans',
          },
        ],
        customer_details: {
          first_name: transaction.name,
          email: transaction.email,
          phone: transaction.phone,
          billing_address: [
            {
              first_name: transaction.name,
              address: transaction.address,
              email: transaction.email,
              phone: transaction.phone,
              postal_code: transaction.postCode,
              country_code: 'ID',
            },
          ],
          shipping_address: [
            {
              first_name: transaction.name,
              address: transaction.address,
              email: transaction.email,
              phone: transaction.phone,
              postal_code: transaction.postCode,
              country_code: 'ID',
            },
          ],
        },
        payment_type: 'bank_transfer',
        custom_expiry: {
          expiry_duration: 60 * 15,
          order_time: new Date().toDateString(),
          unit: 'minute',
        },
      });

      return payment;
    } catch (error) {
      console.log('error on service', error);
      throw error;
    }
  }

  async findAllTransaction() {
    return this.prisma.transaction.findMany({
      include: {
        cart: true,
      },
    });
  }

  async findByUser(userId: string) {
    const findUser = this.prisma.transaction.findMany({
      where: { userId },
      include: {
        cart: true,
      },
    });

    if (!findUser) {
      throw new Error('User not found');
    }

    const findTransactionUser = await this.prisma.transaction.findMany({
      where: { userId },
    });

    return findTransactionUser;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return await this.prisma.transaction.update({
      where: { id },
      data: {
        pay: updateTransactionDto.pay,
        status: updateTransactionDto.status,
        action: updateTransactionDto.action,
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.transaction.delete({ where: { id } });
  }
}
