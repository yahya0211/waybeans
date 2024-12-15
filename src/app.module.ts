import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartsModule } from './carts/carts.module';
import { TransactionModule } from './transaction/transaction.module';
import { MidtransModule } from './midtrans/midtrans.module';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    CartsModule,
    TransactionModule,
    MidtransModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
