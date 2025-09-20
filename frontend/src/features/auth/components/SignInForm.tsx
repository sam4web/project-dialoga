import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { signInSchema, type TSignInSchema } from "../types";
import Input from "@/components/ui/Input";
import { sendLoginRequest } from "../slice";
import useActionWithToast from "@/hooks/useActionWithToast";
import { ILoginRequestDTO } from "../api/types";

function SignInForm() {
  const { executeAction } = useActionWithToast<string, ILoginRequestDTO>();
  const navigate = useNavigate();
  const methods = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });
  const { isSubmitting } = methods.formState;

  const onSubmit: SubmitHandler<TSignInSchema> = async (data) => {
    executeAction({
      action: sendLoginRequest(data),
      loadingMessage: "Logging in, please wait...",
      successMessage: "Successfully logged in.",
    });
    navigate("/chat", { replace: true });
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
