import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: 'waybeans',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [CartsController],
  providers: [CartsService, PrismaService],
})
export class CartsModule {}
