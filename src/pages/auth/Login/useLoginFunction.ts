import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { ILoginForm } from "../../../lib/validation/useLoginValidation";
import { useAppDispatch } from "../../../redux";
import { loginAsync } from "../../../redux/async/auth";
import { toast } from "react-toastify";

interface IProps {
  reset: () => void;
}

export const useLoginFunction = ({ reset }: IProps) => {
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    dispatch(loginAsync(data));
    reset();
    toast.success("Login Success", { position: "top-center" });
  };

  const onErrorSubmit: SubmitErrorHandler<ILoginForm> = (data) => {
    console.log(data);
    toast.error("Invalid credentials", { position: "top-center" });
  };

  return {
    onSubmit,
    onErrorSubmit,
  };
};
