export enum Role {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
}

export class User {
  id: string;
  fullName: string;
  email: string;
  password?: string;
}
