import { ApiProperty } from '@nestjs/swagger';
import { TransactionStateus } from '../entities/transaction.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  cartId: string;

  @ApiProperty({
    description: 'Name of the user',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Phone of the user',
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'PostCode of the user',
  })
  @IsNotEmpty()
  postCode: string;

  @ApiProperty({
    description: 'Address of the user',
  })
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Attachment of the user',
  })
  @IsNotEmpty()
  attachment?: string;

  userId: string;
  action?: boolean;
  status?: TransactionStateus;

  transactionStatus: TransactionStateus;
}
