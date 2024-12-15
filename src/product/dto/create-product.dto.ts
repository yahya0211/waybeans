import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'product',
  })
  nameProduct: string;

  @ApiProperty({
    description: 'Description of the product',
    example: 'This is a product',
  })
  description: string;
  userId: number;

  @ApiProperty({
    description: 'Stock of the product',
    example: '10',
  })
  stock: number;

  @ApiProperty({
    description: 'Price of the product',
    example: '100000',
  })
  price: number;

  @ApiProperty({
    description: 'Photo of the product',
    example: 'photo.png',
  })
  @ApiProperty({
    description: 'Photo of the product',
    type: String,
    format: 'binary',
  })
  productPhoto?: string;
}
