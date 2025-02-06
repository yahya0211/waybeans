import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { ITransaction } from "../../redux/type/app";
import { useAppDispatch } from "../../redux";
import { toast } from "react-toastify";
import { checkoutAsync } from "../../redux/async/checkout";
import { useNavigate, useParams } from "react-router-dom";

interface IProps {
  reset: () => void;
}

export const useCheckoutFunction = ({ reset }: IProps) => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ITransaction> = async (data) => {
    dispatch(checkoutAsync({ data, id: id as string }));
    reset();
    toast.success("Thank you for ordering in us, please wait 1 x 24 hours to verify you order", { position: "top-center" });
    navigate("/profile/");
    return data;
  };

  const onErrorSubmit: SubmitErrorHandler<ITransaction> = (data) => {
    console.log(data);
    toast.error(`${data}`, { position: "top-center" });
  };

  return { onSubmit, onErrorSubmit };
};
