import { cx } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

const baseStyles = "border-2 hover:opacity-85 hover:-translate-y-0.5 py-2.5 px-4 shadow-xs";
const variantStyles = {
  primary: `bg-primary border-primary text-primary-light ${baseStyles}`,
  secondary: `bg-secondary border-secondary text-slate-800 ${baseStyles}`,
  danger: `bg-red-500 border-red-500 text-white ${baseStyles}`,
  icon: "text-grey-200 bg-transparent [&>svg]:size-4.5 p-2.5 border-0 border-transparent hover:border-gray-500/40 hover:bg-orange-100/70 dark:hover:bg-slate-50/10 [&>svg]:text-gray-700 dark:[&>svg]:text-gray-200 dark:hover:[&>svg]:text-primary-light hover:[&>svg]:text-slate-800",
  outline: `border-slate-300 text-color-primary ${baseStyles}`,
};

type Props = {
  children: ReactNode;
  variant: keyof typeof variantStyles;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, variant, className, title, ...props }: Props) {
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
