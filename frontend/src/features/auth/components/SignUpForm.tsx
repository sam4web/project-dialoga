import Button from "@/components/shared/Button";
import InputField from "./InputField";

function SignUpForm() {
  return (
    <>
      <div className="space-y-4 sm:space-y-4.5">
        <InputField title="Full Name" type="text" name="fullname" placeholder="Enter your full name" />
        <InputField title="Email" type="email" name="email" placeholder="Enter your email" />
        <InputField title="Password" type="password" name="password" placeholder="Enter your password" />
        <InputField
          title="Confirm Password"
          type="password"
          name="confirm-password"
          placeholder="Enter your password"
        />
      </div>
      <Button type="submit" varient="primary">
        Create Account
      </Button>
    </>
  );
}

export default SignUpForm;
