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
        <div className="bg-orange-50 dark:bg-zinc-800 inline-block rounded-xl p-2.5 sm:p-4 shadow-sm">
          <img src="/logo-transparent.png" alt="dialoga logo" className="size-16 sm:size-20" />
        </div>
        <div className="space-y-1.5">
          <h2 className="header-text text-3xl">Dialoga</h2>
          <p className="text-color-light text-lg">Connect with friends instantly</p>
        </div>
      </div>

      <div className="max-w-md sm:max-w-lg w-full mx-auto container-card">
        <div className="text-center">
          <h3 className="header-text text-2xl">Welcome</h3>
          <p className="text-color-light">Sign in to your account or create a new one</p>
        </div>
        <div className="bg-zinc-200/60 dark:bg-zinc-700/60 p-1 rounded-lg">
          <div className="relative flex">
            <div
              className={cx(
                "bg-white dark:bg-zinc-800 absolute rounded-md w-1/2 h-full inset-0 text-zinc-800 dark:text-white flex-center z-10 transition-all",
                formType === "sign-in" ? "translate-x-0" : "translate-x-full"
              )}
            />
            {formOptions.map((option) => (
              <button
                key={option.type}
                className={cx(
                  "flex-1 rounded-md py-[7px] text-sm font-medium text-zinc-600 dark:text-zinc-400 cursor-pointer z-20"
                )}
                onClick={() => setFormType(option.type)}
              >
                <p>{option.label}</p>
              </button>
            ))}
          </div>
        </div>
        {formType === "sign-in" ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
}

export default LoginPage;
