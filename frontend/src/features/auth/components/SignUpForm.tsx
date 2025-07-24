import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import { signUpSchema, type TSignUpSchema } from "../types";
import Input from "@/components/ui/Input";

function SignUpForm() {
  const methods = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TSignUpSchema> = (data) => {
    console.log(data);
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
        <Button type="submit" variant="primary" className="w-full">
          Create Account
        </Button>
      </form>
    </FormProvider>
  );
}

export default SignUpForm;
