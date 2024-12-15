import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { MidtransModule } from 'src/midtrans/midtrans.module';
import { MidtransService } from 'src/midtrans/midtrans.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'waybeans',
      signOptions: { expiresIn: '1d' },
    }),

    MidtransModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService, MidtransService],
})
export class TransactionModule {}
