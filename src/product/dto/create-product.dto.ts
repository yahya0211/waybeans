export class CreateProductDto {
  nameProduct: string;
  description: string;
  userId: number;
  stock: number;
  price: number;
  productPhoto?: string;
}
