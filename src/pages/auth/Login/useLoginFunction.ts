import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { ILoginForm } from "../../../lib/validation/useLoginValidation";
import { useAppDispatch } from "../../../redux";
import { loginAsync } from "../../../redux/async/auth";

interface IProps {
  reset: () => void;
}

export const useLoginFunction = ({ reset }: IProps) => {
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    dispatch(loginAsync(data));
  };

  const onErrorSubmit: SubmitErrorHandler<ILoginForm> = (data) => {
    console.log(data);
  };

  return {
    onSubmit,
    onErrorSubmit,
  };
};
