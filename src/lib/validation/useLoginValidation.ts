import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface ILoginForm {
  email: string;
  password: string;
}

export const useLoginValidation = () => {
  const initialValue: ILoginForm = {
    email: "",
    password: "",
  };

  const schema = yup.object().shape({
    email: yup.string().email().required("Please input the email"),
    password: yup.string().required("Please input the password"),
  });

  return useForm<ILoginForm>({
    defaultValues: initialValue,
    mode: "all",
    reValidateMode: "onBlur",
    resolver: yupResolver(schema),
  });
};
