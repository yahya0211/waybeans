import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IProduct } from "../../redux/type/app";

export interface IProductState {
  nameProduct: string;
  stock: number;
  price: number;
  description: string;
  file: File;
}

export const useProductValidation = () => {
  const initialValue: IProductState = {
    nameProduct: "",
    stock: 0,
    price: 0,
    description: "",
    file: new File([], ""),
  };

  const schema = yup.object({
    nameProduct: yup.string().required("Product name is required"),
    stock: yup.number().required("Stock is required"),
    price: yup.number().required("Price is required"),
    description: yup.string().required("Description is required"),
  });
  
  return useForm<IProduct>({
    defaultValues: initialValue,
    mode: "all",
    reValidateMode: "onBlur",
    resolver: yupResolver(schema) as any,
  });
};
