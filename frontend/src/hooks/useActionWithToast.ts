import { ThunkApiConfig, useAppDispatch } from "@/app/store";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface IExecuteActionProps<TResponse, TArgs> {
  action: AsyncThunkAction<TResponse, TArgs, ThunkApiConfig>;
  loadingMessage: string;
  successMessage: string;
}

const useActionWithToast = <TResponse, TArgs>() => {
  const dispatch = useAppDispatch();

  const executeAction = async ({
    action,
    loadingMessage,
    successMessage,
  }: IExecuteActionProps<TResponse, TArgs>): Promise<TResponse | undefined> => {
    try {
      const toastId = toast.info(loadingMessage);
      const result = await dispatch(action).unwrap();
      toast.dismiss(toastId);
      toast.success(successMessage);
      if (result) return result;
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    }
  };

  return { executeAction };
};

export default useActionWithToast;
