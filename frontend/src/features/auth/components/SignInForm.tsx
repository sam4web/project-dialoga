import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import { signInSchema, type TSignInSchema } from "../types";
import Input from "@/components/ui/Input";

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
          <Input<TSignInSchema> title="Email" type="email" label="email" placeholder="Enter your email" />
          <Input<TSignInSchema> title="Password" type="password" label="password" placeholder="Enter your password" />
        </div>
        <Link to="/" className="block text-primary font-medium">
          Forgot password?
        </Link>
        <Button type="submit" variant="primary" className="w-full">
          Sign In
        </Button>
      </form>
    </FormProvider>
  );
}

export default SignInForm;
