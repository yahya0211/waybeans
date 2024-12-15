import { Injectable } from '@nestjs/common';
import * as midtransClent from 'midtrans-client';

@Injectable()
export class MidtransService {
  private snap;
  constructor() {
    this.snap = new midtransClent.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    });
  }

  async createSnapTransaction(parameter) {
    try {
      const transaction = await this.snap.createTransaction(parameter);
      return transaction;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
