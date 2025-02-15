import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface IRegister {
  fullName: string;
  email: string;
  password: string;
  role: "BUYER" | "SELLER";
}

export const useRegisterValidate = () => {
  const initialValue: IRegister = {
    email: "",
    fullName: "",
    password: "",
    role: "BUYER" || "SELLER",
  };

  const schema = yup.object().shape({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    role: yup.mixed<"BUYER" | "SELLER">().oneOf(["BUYER", "SELLER"]).required(),
  });

  return useForm<IRegister>({
    defaultValues: initialValue,
    mode: "all",
    reValidateMode: "onBlur",
    resolver: yupResolver(schema),
  });
};
