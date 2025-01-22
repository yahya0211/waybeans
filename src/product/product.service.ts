import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import cloudinary from 'src/config/cloudinary';
import * as fs from 'fs';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: CreateProductDto,
    file: Express.Multer.File,
    userId: string,
  ): Promise<any> {
    try {
      let imageUrl: string = dto.productPhoto || '';

      console.log('file', file);

      if (file) {
        const filePath = file as unknown as Express.Multer.File;

        const cloudinaryUpload = await cloudinary.uploader.upload(
          filePath.path,
          {
            folder: 'products',
          },
        );
        imageUrl = cloudinaryUpload.secure_url;

        fs.unlinkSync(filePath.path);
      }

      const stock = Number(dto.stock);
      const price = Number(dto.price);

      const { nameProduct, description } = dto;

      return await this.prisma.product.create({
        data: {
          nameProduct,
          description,
          userId: userId,
          stock,
          price,
          productPhoto: imageUrl,
        },
      });
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    await this.prisma.cart.deleteMany({
      where: {
        productId: id,
      },
    });

    return this.prisma.product.deleteMany({
      where: {
        id: id,
      },
    });
  }
}
