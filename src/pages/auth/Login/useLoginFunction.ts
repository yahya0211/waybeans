import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { ILoginForm } from "../../../lib/validation/useLoginValidation";
import { useAppDispatch } from "../../../redux";
import { loginAsync } from "../../../redux/async/auth";
import { toast, Flip } from "react-toastify";
import { useState } from "react";

interface IProps {
  reset: () => void;
}

export const useLoginFunction = ({ reset }: IProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      setIsLoading(true);
      const res = await dispatch(loginAsync(data));
      reset();
      return res;
    } catch (error) {
      setIsError(error as string);
      console.log("error on:", error);
    }
  };

  const onErrorSubmit: SubmitErrorHandler<ILoginForm> = (errors) => {
    Object.keys(errors).forEach((key) => {
      const errorMessage = errors[key as keyof ILoginForm]?.message;

      if (errorMessage) {
        toast.error(`🛑 ${errorMessage}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
      }
    });
    console.error("Validation Errors:", errors);
  };

  return {
    onSubmit,
    onErrorSubmit,
    isLoading,
    isError,
  };
};
