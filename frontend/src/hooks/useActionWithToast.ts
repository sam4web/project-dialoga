import { ThunkApiConfig, useAppDispatch } from "@/app/store";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const useActionWithToast = <TResponse, TArgs>() => {
  const dispatch = useAppDispatch();

  const executeAction = async ({
    action,
    loadingMessage,
    successMessage,
  }: {
    action: AsyncThunkAction<TResponse, TArgs, ThunkApiConfig>;
    loadingMessage?: string;
    successMessage?: string;
  }): Promise<TResponse | undefined> => {
    try {
      let toastId = null;
      if (loadingMessage) toastId = toast.info(loadingMessage);
      const result = await dispatch(action).unwrap();
      if (toastId) toast.dismiss(toastId);
      if (successMessage) toast.success(successMessage);
      if (result) return result;
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    }
  };

  return { executeAction };
};

export default useActionWithToast;
