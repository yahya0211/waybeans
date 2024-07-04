import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartsModule } from './carts/carts.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [AuthModule, ProductModule, CartsModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
