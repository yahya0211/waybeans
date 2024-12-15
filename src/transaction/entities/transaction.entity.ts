export enum TransactionStateus {
  WAITING_APPROVE = 'WAITING_APPROVE',
  SHIPPED = 'SHIPPED',
  CANCELLED = 'CANCELLED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  RETURNED = 'RETURNED',
}

export class Transaction {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  postCode: string;
  address: string;
  attachment: string;
  transactionStateus: string;
}
