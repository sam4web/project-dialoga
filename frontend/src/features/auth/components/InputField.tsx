import { cx } from "@/lib/utils";
import { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  title: string;
  name: string;
  type: HTMLInputTypeAttribute;
} & InputHTMLAttributes<HTMLInputElement>;

function InputField({ title, name, type, className, ...props }: Props) {
  const isPasswordField = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-gray-800 font-medium">
        {title}
      </label>

      <div className={isPasswordField ? "relative" : ""}>
        <input
          id={name}
          type={!type ? "text" : isPasswordField && showPassword ? "text" : type}
          name={name}
          title={title}
          className={cx(
            "font-foreground text-gray-800 border-2 border-gray-400/30 rounded-lg focus:outline-2 outline-primary transition px-3 py-2 focus:placeholder:text-transparent w-full",
            className ? className : ""
          )}
          autoComplete={isPasswordField ? "current-password" : name}
          {...props}
        />

        {isPasswordField && (
          <button
            className="absolute top-1/2 -translate-y-1/2 right-3.5 text-gray-500/70 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        )}
      </div>
    </div>
  );
}

export default InputField;
