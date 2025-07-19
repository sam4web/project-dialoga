import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import InputField from "./InputField";
import { signUpSchema, type TSignUpSchema } from "../types";

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
          <InputField<TSignUpSchema>
            title="Full Name"
            type="text"
            label="fullname"
            placeholder="Enter your full name"
          />
          <InputField<TSignUpSchema> title="Email" type="email" label="email" placeholder="Enter your email" />
          <InputField<TSignUpSchema>
            title="Password"
            type="password"
            label="password"
            placeholder="Create a password"
          />
          <InputField<TSignUpSchema>
            title="Confirm Password"
            type="password"
            label="confirmPassword"
            placeholder="Confirm your password"
          />
        </div>
        <Button type="submit" varient="primary" className="w-full">
          Create Account
        </Button>
      </form>
    </FormProvider>
  );
}

export default SignUpForm;
