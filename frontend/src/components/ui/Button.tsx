import { cx } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  varient: "primary" | "icon";
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, varient, className, title, ...props }: Props) {
  const varientStyles = {
    primary: "bg-primary text-primary-light hover:opacity-85 hover:-translate-y-0.5 py-2.5 px-4",
    icon: "text-grey-200 bg-transparent [&>svg]:size-5 [&>svg]:text-gray-700 p-2 border-2 border-gray-500/40 hover:bg-orange-200/10 hover:text-slate-700 hover:border-primary/35",
  };

  return (
    <button
      title={title ? title : children?.toString()}
      className={cx(
        "text-center cursor-pointer rounded-lg font-foreground font-medium",
        varientStyles[varient],
        className ? className : ""
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
