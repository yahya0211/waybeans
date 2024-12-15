import { ApiProperty } from '@nestjs/swagger';
import { TransactionStateus } from '../entities/transaction.entity';
import { IsEmail } from 'class-validator';

export class CreateTransactionDto {
  cartId: string;

  @ApiProperty({
    description: 'Name of the user',
  })
  name: string;

  @ApiProperty({
    description: 'Email of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Phone of the user',
  })
  phone: string;

  @ApiProperty({
    description: 'PostCode of the user',
  })
  postCode: string;

  @ApiProperty({
    description: 'Address of the user',
  })
  address: string;

  @ApiProperty({
    description: 'Attachment of the user',
  })
  attachment?: string;

  userId: string;
  action?: boolean;
  status?: TransactionStateus

  transactionStatus: TransactionStateus;
}
