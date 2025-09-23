import { cx } from "@/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

const baseStyles = "border-2 hover:opacity-85 hover:-translate-y-0.5 py-2 px-4 shadow-xs";
const variantStyles = {
  primary: `bg-primary border-primary text-primary-light ${baseStyles}`,
  secondary: `bg-secondary border-secondary text-zinc-800 ${baseStyles}`,
  danger: `bg-red-500 border-red-500 text-white ${baseStyles}`,
  outline: `border-zinc-300 text-color-primary ${baseStyles}`,
  icon: "hover:[&>svg]:text-zinc-800 dark:hover:[&>svg]:text-primary-light bg-transparent hover:bg-zinc-200/80 [&>svg]:size-4.5 p-2.5 dark:hover:bg-zinc-50/10 dark:[&>svg]:text-zinc-200 [&>svg]:text-zinc-700",
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
        "text-center cursor-pointer rounded-lg font-foreground font-medium disabled:opacity-75 disabled:translate-y-0!",
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
