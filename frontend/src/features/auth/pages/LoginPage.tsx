import useTitle from "@/hooks/useTitle";
import { cx } from "@/lib/utils";
import { useState } from "react";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";

type TFormType = "sign-in" | "sign-up";

function LoginPage() {
  useTitle({ title: "Welcome to Dialoga | Login to get started" });

  const [formType, setFormType] = useState<TFormType>("sign-in");
  const formOptions: { label: string; type: TFormType }[] = [
    { label: "Sign In", type: "sign-in" },
    { label: "Sign Up", type: "sign-up" },
  ];

  return (
    <div className="container flex flex-center flex-col space-y-5 sm:space-y-7">
      <div className="text-center space-y-2 sm:space-y-4">
        <div className="bg-orange-50 inline-block rounded-xl p-2.5 sm:p-4 shadow-sm">
          <img src="/logo-transparent.png" alt="dialoga logo" className="size-16 sm:size-20" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-gray-800 font-semibold text-3xl">Dialoga</h2>
          <p className="text-gray-500 text-lg">Connect with friends instantly</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl max-w-md sm:max-w-lg w-full mx-auto px-3 sm:px-6 py-4 sm:py-7 space-y-4 sm:space-y-6">
        <div className="text-center">
          <h3 className="text-gray-800 font-semibold text-2xl">Welcome</h3>
          <p className="text-gray-500">Sign in to your account or create a new one</p>
        </div>

        <div className="flex bg-gray-200/80 p-1 rounded-lg">
          {formOptions.map((option) => (
            <button
              key={option.type}
              className={cx("input-toggle-btn", formType === option.type ? "active" : "")}
              onClick={() => setFormType(option.type)}
            >
              {option.label}
            </button>
          ))}
        </div>

        {formType === "sign-in" ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
}

export default LoginPage;
