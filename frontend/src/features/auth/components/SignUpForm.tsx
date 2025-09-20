import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import { signUpSchema, type TSignUpSchema } from "../types";
import Input from "@/components/ui/Input";
import { sendRegisterRequest } from "../slice/authThunks";
import { useNavigate } from "react-router-dom";
import useActionWithToast from "@/hooks/useActionWithToast";
import { IRegisterRequestDTO } from "../api/types";

function SignUpForm() {
  const { executeAction } = useActionWithToast<string, IRegisterRequestDTO>();
  const navigate = useNavigate();
  const methods = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });
  const { isSubmitting } = methods.formState;

  const onSubmit: SubmitHandler<TSignUpSchema> = async (data) => {
    executeAction({
      action: sendRegisterRequest(data),
      loadingMessage: "Registering your account, please wait...",
      successMessage: "Successfully registered user.",
    });
    navigate("/chat", { replace: true });
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-4 sm:space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4 sm:space-y-4.5">
          <Input<TSignUpSchema> title="Full Name" type="text" label="fullname" placeholder="Enter your full name" />
          <Input<TSignUpSchema> title="Email" type="email" label="email" placeholder="Enter your email" />
          <Input<TSignUpSchema> title="Password" type="password" label="password" placeholder="Create a password" />
          <Input<TSignUpSchema>
            title="Confirm Password"
            type="password"
            label="confirmPassword"
            placeholder="Confirm your password"
          />
        </div>
        <Button disabled={isSubmitting} type="submit" variant="primary" className="w-full">
          Create Account
        </Button>
      </form>
    </FormProvider>
  );
}

export default SignUpForm;
