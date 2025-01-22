import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { MidtransModule } from 'src/midtrans/midtrans.module';
import { MidtransService } from 'src/midtrans/midtrans.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'waybeans',
      signOptions: { expiresIn: '1d' },
    }),

    MidtransModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = file.originalname.split('.').pop();
          cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    })
  ],
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService, MidtransService],
})
export class TransactionModule {}
