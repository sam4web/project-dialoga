import { cx, getRandomHexColor } from "@/utils";
import { memo } from "react";

interface Props {
  fullname: string;
  alt: string;
  className?: string;
  src?: string;
}

const UserAvatar = memo(function UserAvatar({ className = "", alt, fullname, src }: Props) {
  if (!src) {
    return (
      <div
        style={{ backgroundColor: getRandomHexColor() }}
        className={cx(
          "size-13 shadow-sm rounded-full flex-center text-xl sm:text-2xl font-semibold text-zinc-900",
          className
        )}
      >
        {fullname.slice(0, 1).toUpperCase()}
      </div>
    );
  }

  return (
    <img src={src} alt={alt} className={cx("size-13 shadow-sm rounded-full object-cover object-center", className)} />
  );
});

export default UserAvatar;
