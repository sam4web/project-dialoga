import { Link } from "react-router-dom";
import InputField from "./InputField";
import Button from "@/components/shared/Button";

function SignInForm() {
  return (
    <>
      <div className="space-y-4 sm:space-y-4.5">
        <InputField title="Email" type="email" name="email" placeholder="Enter your email" />
        <InputField title="Password" type="password" name="password" placeholder="Enter your password" />
      </div>
      <Link to="/" className="block text-primary font-medium">
        Forgot password?
      </Link>
      <Button type="submit" varient="primary">
        Sign In
      </Button>
    </>
  );
}

export default SignInForm;
