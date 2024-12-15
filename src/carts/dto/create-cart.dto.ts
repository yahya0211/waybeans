import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateCartDto {
  @ApiProperty({
    description: 'Quantity of the product',
    example: '2',
  })
  qty: string;

  totalPrice: number;
  userId: string;
  productId: string;
}
