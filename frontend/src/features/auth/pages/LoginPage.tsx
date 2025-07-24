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
    <div className="container flex-center flex-col space-y-5 sm:space-y-7">
      <div className="text-center space-y-2 sm:space-y-4">
        <div className="bg-orange-50 dark:bg-gray-800 inline-block rounded-xl p-2.5 sm:p-4 shadow-sm">
          <img src="/logo-transparent.png" alt="dialoga logo" className="size-16 sm:size-20" />
        </div>
        <div className="space-y-1.5">
          <h2 className="header-text text-3xl">Dialoga</h2>
          <p className="text-color-light text-lg">Connect with friends instantly</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl max-w-md sm:max-w-lg w-full mx-auto px-3 sm:px-6 py-4 sm:py-7 space-y-4 sm:space-y-6">
        <div className="text-center">
          <h3 className="header-text text-2xl">Welcome</h3>
          <p className="text-color-light">Sign in to your account or create a new one</p>
        </div>

        <div className="flex bg-gray-200/80 dark:bg-gray-700/80 p-1 rounded-lg">
          {formOptions.map((option) => (
            <button
              key={option.type}
              className={cx(
                "flex-1 rounded-md py-[7px] text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer",
                formType === option.type ? "bg-white dark:bg-slate-800 text-gray-800 dark:text-white" : ""
              )}
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
