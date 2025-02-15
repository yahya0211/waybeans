import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { IProduct } from "../../redux/type/app";
import { useAppDispatch } from "../../redux";
import { addProducts, updateProducts } from "../../redux/async/products";

interface IProps {
  reset: () => void;
  imageFile: File | null;
}

interface IUpdateProduct {
  reset: () => void;
  id: string;
}

export const useUpdateProductFunction = ({ reset, id }: IUpdateProduct) => {
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("stock", String(data.stock));
      formData.append("price", String(data.price));

      const res = await dispatch(updateProducts({ id, formData }));
      reset();
      return res;
    } catch (error) {
      console.log("error on:", error);
    }
  };

  const onErrorSubmit: SubmitErrorHandler<IProduct> = (data) => {
    console.log("data on error:", data);
  };

  return { onSubmit, onErrorSubmit };
};

export const useProductsFunction = ({ reset, imageFile }: IProps) => {
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("nameProduct", data.nameProduct);
      formData.append("stock", String(data.stock));
      formData.append("price", String(data.price));
      formData.append("description", data.description);

      if (imageFile) {
        formData.append("productPhoto", imageFile);
      }

      const res = await dispatch(addProducts(formData));
      reset();
      return res;
    } catch (error) {
      console.log("error on:", error);
    }
  };

  const onErrorSubmit: SubmitErrorHandler<IProduct> = (data) => {
    console.log("data on error:", data);
  };

  return { onSubmit, onErrorSubmit };
};
