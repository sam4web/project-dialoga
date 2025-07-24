import { cx } from "@/lib/utils";
import { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  title: string;
  label: Path<T>;
  type?: HTMLInputTypeAttribute;
  spacing?: "sm" | "md" | "lg";
} & InputHTMLAttributes<HTMLInputElement>;

function Input<T extends FieldValues>({ title, type, label, className, spacing, ...props }: Props<T>) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<T>();

  const isPasswordField = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const fieldValue = isPasswordField ? watch(label) : undefined;
  const fieldError = errors[label]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={label} className={cx("text-color-primary font-medium", spacing === "sm" ? "text-sm" : "")}>
        {title}
      </label>

      <div className={isPasswordField ? "relative" : ""}>
        <input
          id={label}
          type={!type ? "text" : isPasswordField && showPassword ? "text" : type}
          title={label}
          className={cx(
            "font-foreground text-color-primary dark:placeholder:text-gray-500 border-2 border-gray-400/30 focus:outline-2 outline-primary transition focus:placeholder:text-transparent w-full",
            spacing === "sm" ? "py-1 px-2 rounded-md" : "py-2.5 px-3 rounded-lg",
            fieldError ? "border-red-400 outline-red-300" : "",
            className ? className : ""
          )}
          autoComplete={isPasswordField ? "current-password" : label}
          {...register(label)}
          {...props}
        />

        {isPasswordField && fieldValue && (
          <button
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-3.5 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <span className="text-gray-500/80">{showPassword ? <Eye size={22} /> : <EyeOff size={22} />}</span>
          </button>
        )}
      </div>

      {fieldError && <p className="text-red-500 text-sm">{fieldError}</p>}
    </div>
  );
}

export default Input;
