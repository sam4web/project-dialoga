import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { signInSchema, type TSignInSchema } from "../types";
import Input from "@/components/ui/Input";
import { sendLoginRequest } from "../slice";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "react-toastify";

function SignInForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const methods = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });
  const { isSubmitting } = methods.formState;

  const onSubmit: SubmitHandler<TSignInSchema> = async (data) => {
    try {
      const toastId = toast.info("Registering your account, please wait...");
      await dispatch(sendLoginRequest(data)).unwrap();
      toast.dismiss(toastId);
      toast.success("Successfully registered user.");
      navigate("/chat", { replace: true });
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-4 sm:space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4 sm:space-y-4.5">
          <Input<TSignInSchema> title="Email" type="email" label="email" placeholder="Enter your email" />
          <Input<TSignInSchema> title="Password" type="password" label="password" placeholder="Enter your password" />
        </div>
        <Link to="/" className="block text-primary font-medium">
          Forgot password?
        </Link>
        <Button disabled={isSubmitting} type="submit" variant="primary" className="w-full">
          Sign In
        </Button>
      </form>
    </FormProvider>
  );
}

export default SignInForm;
