import { cx } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant: "primary" | "icon" | "outline";
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, variant, className, title, ...props }: Props) {
  const variantStyles = {
    primary: "bg-primary text-primary-light hover:opacity-85 hover:-translate-y-0.5 py-2.5 px-4",
    icon: "text-grey-200 bg-transparent [&>svg]:size-4.5 p-2.5 border-0 border-transparent hover:border-gray-500/40 hover:bg-orange-100/70 dark:hover:bg-slate-50/10 [&>svg]:text-gray-700 dark:[&>svg]:text-gray-200 dark:hover:[&>svg]:text-primary-light hover:[&>svg]:text-slate-800",
    outline: "",
  };

  return (
    <button
      title={title ? title : children?.toString()}
      className={cx(
        "text-center cursor-pointer rounded-lg font-foreground font-medium",
        variantStyles[variant],
        className ? className : ""
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
