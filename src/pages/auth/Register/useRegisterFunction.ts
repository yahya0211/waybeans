import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API } from "../../../lib";
import { IRegister } from "../../../lib/validation/useRegistervalidation";
import { toast } from "react-toastify";

interface IProps {
  reset: () => void;
}

export const UseRegister = ({ reset }: IProps) => {
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    try {
      const res = await API.post("/auth/register", data);
      navigate("/auth/login");
      reset();
      toast.success("Registration successful", { position: "top-center" });
      return res;
    } catch (error) {
      console.log("error on:", error);
      toast.error("User Already Registered", { position: "top-center" });
    }
  };

  const onErrorSubmit: SubmitErrorHandler<IRegister> = (data) => {
    console.log("data on error:", data);
  };

  return {
    onSubmit,
    onErrorSubmit,
  };
};
