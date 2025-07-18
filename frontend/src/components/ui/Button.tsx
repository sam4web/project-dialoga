import { cx } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  varient: "primary" | "transparent" | "icon";
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, varient, className, ...props }: Props) {
  const varientStyles = {
    primary: "bg-primary text-primary-light",
    transparent: "",
    icon: "",
  };

  return (
    <button
      title={children?.toString()}
      className={cx(
        "w-full text-center cursor-pointer py-2.5 rounded-lg hover:opacity-85 hover:-translate-y-0.5 font-foreground font-medium",
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
