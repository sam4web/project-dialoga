import { cx } from "@/lib/utils";
import { useState } from "react";

type Props = {
  value?: boolean;
  onChange: (value: boolean) => void;
  className?: string;
};

function Switch({ value = false, onChange, className, ...props }: Props) {
  const [checked, setChecked] = useState(value);

  const handleClick = () => {
    onChange(!checked);
    setChecked((prev) => !prev);
  };

  return (
    <button
      onClick={handleClick}
      className={cx(
        "p-1 w-10 rounded-full cursor-pointer",
        checked ? "bg-primary" : "bg-gray-300 dark:bg-gray-700",
        className ? className : ""
      )}
      {...props}
    >
      <div className={cx("size-4 bg-white rounded-full shadow-sm", checked ? "translate-x-full" : "translate-x-0")} />
    </button>
  );
}

export default Switch;
