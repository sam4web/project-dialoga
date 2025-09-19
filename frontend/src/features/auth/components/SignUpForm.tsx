import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import { signUpSchema, type TSignUpSchema } from "../types";
import Input from "@/components/ui/Input";
import { sendRegisterRequest } from "../slice/authThunks";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/hooks";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const methods = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });
  const { isSubmitting } = methods.formState;

  const onSubmit: SubmitHandler<TSignUpSchema> = async (data) => {
    try {
      const toastId = toast.info("Logging in, please wait...");
      await dispatch(sendRegisterRequest(data)).unwrap();
      toast.dismiss(toastId);
      toast.success("Successfully logged in.");
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
