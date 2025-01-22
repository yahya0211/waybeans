export interface IProduct {
  id: string;
  nameProduct: string;
  stock: number;
  price: number;
  qty: number;
  description: string;
  productPhoto: string;
}

export interface IProductState {
  product: IProduct[];
  error: string | null;
  isLoading: boolean;
  productDetail: IProduct;
}

export interface ITransaction {
  name: string;
  email: string;
  phone: string;
  postCode: string;
  address: string;
  attachment: string;
  createdAt?: Date;
  updaetdAt?: Date;
  deletedAt?: Date;
}

export interface IUser {
  fullName: string;
  email: string;
  role: Role;
  photoProfile: string;
  cart: ICart[];
}

export interface ICart {
  id: string;
  userId: string;
  productId: string;
  qty: number;
  totalPrice: number;
  createdAt: Date;
  updaetdAt?: Date;
  deletedAt?: Date;
  product?: IProduct;
}

enum Role {
  Buyer = "BUYER",
  Seller = "SELLER",
}
