import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import InputField from "./InputField";
import Button from "@/components/ui/Button";
import { signInSchema, type TSignInSchema } from "../types";

function SignInForm() {
  const methods = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TSignInSchema> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-4 sm:space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4 sm:space-y-4.5">
          <InputField<TSignInSchema> title="Email" type="email" label="email" placeholder="Enter your email" />
          <InputField<TSignInSchema>
            title="Password"
            type="password"
            label="password"
            placeholder="Enter your password"
          />
        </div>
        <Link to="/" className="block text-primary font-medium">
          Forgot password?
        </Link>
        <Button type="submit" varient="primary" className="w-full">
          Sign In
        </Button>
      </form>
    </FormProvider>
  );
}

export default SignInForm;
