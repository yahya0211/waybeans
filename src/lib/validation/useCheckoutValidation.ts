import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ITransaction } from "../../redux/type/app";

export const useCheckoutValidation = () => {
  const initialValue: ITransaction = {
    name: "",
    email: "",
    phone: "",
    postCode: "",
    address: "",
    attachment: "",
  };

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    postCode: yup.string().required(),
    address: yup.string().required(),
    attachment: yup.string().required(),
  });

  return useForm<ITransaction>({
    defaultValues: initialValue,
    mode: "all",
    reValidateMode: "onBlur",
    resolver: yupResolver(schema),
  });
};
